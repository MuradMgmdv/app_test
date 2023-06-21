import style from './styles.module.css';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDeletePost } from '../../redux/slice/posts';

function Article({ el }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickDelete = () => {
    dispatch(fetchDeletePost(el.id));
  };

  return (
    <div  className={style.cardWrapper}>
      <div  className={style.cardHead}>
        <div onClick={() => navigate(`post/${el.id}`)} className={style.title}>
          {el.title}
        </div>
        <div>{el.author}</div>
      </div>
      <div className={style.cardBody}>
        <div>{el.text}</div>
      </div>
      <div className={style.cardFooter}>
        <div>{el.subject}</div>
        <div className={style.comment} onClick={() => navigate(`post/${el.id}`)}>
          комментариев:({el.comments?.length})
        </div>
      </div>
      <div>{new Date(el.atCreated).toDateString()}</div>
      <div className={style.cardSet}>
        <button onClick={onClickDelete} className={style.deleteButton}>
          Удалить
        </button>
        <Link to={`posts/${el.id}/edit`}>
          <button className={style.editButton}>Редактировать</button>
        </Link>
      </div>
    </div>
  );
}

export default Article;
