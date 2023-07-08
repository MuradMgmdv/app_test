import style from './styles.module.css';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/slice/posts';
import Article from '../Article/Article';
import Search from '../Search/Search';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';

function ArticleList() {
  const { filteredPosts } = useSelector((state) => state.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPage, setPostPage] = useState(2);

  const lastPostIndex = currentPage * postsPage;
  const firstPostIndex = lastPostIndex - postsPage;
  const currenPost = filteredPosts.slice(firstPostIndex, lastPostIndex);

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return (
    <>
      <Search />
      <div className={style.container}>
        {currenPost.map((el) => (
          <div key={el.id}>
            <Article el={el} />
          </div>
        ))}
      </div>
      <Pagination postsPage={postsPage} totalPost={filteredPosts.length} paginate={paginate} />
    </>
  );
}

export default ArticleList;
