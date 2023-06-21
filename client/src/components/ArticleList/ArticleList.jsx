import style from './styles.module.css';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/slice/posts';
import Article from '../Article/Article';
import Search from '../Search/Search';

function ArticleList() {
  const { filteredPosts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return (
    <>
      <Search />
      <div className={style.container}>
        {filteredPosts.map((el) => (
          <div key={el.id}>
            <Article el={el} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ArticleList;
