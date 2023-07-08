import styles from './styles.module.css';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddComment, fetchPosts } from '../../redux/slice/posts';

function OneArticle() {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const handkeClick = () => {
    if (comment.length > 1) {
      dispatch(fetchAddComment({ id, comment }));
      setComment('');
    }
  };
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  useEffect(() => {
    setPost(posts.find((el) => el.id === id));
  }, [posts, id]);

  return (
    <div className={styles.cardWrapper}>
      {post && (
        <>
          <div className={styles.cardHead}>
            <div className={styles.title}>{post.title}</div>
            <div>{post.author}</div>
          </div>
          <div className={styles.cardBody}>
            <div>{post.text}</div>
          </div>
          <div className={styles.cardFooter}>
            <div>{post.subject}</div>
          </div>
          <div className={styles.commentsList}>
            <h3>Написать комментарий</h3>
            <div className={styles.commentsHead}>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={styles.commentInput}
                name="comment"
                type="text"
              />
              <button className={styles.btn} onClick={handkeClick}>
                Отправить
              </button>
            </div>
            <div className={styles.commentsBody}>
              {post.comments.map((el, i) => (
                <div key={i} className={styles.commentCard}>
                  <div className={styles.avatar}></div>
                  <span>{el}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OneArticle;
