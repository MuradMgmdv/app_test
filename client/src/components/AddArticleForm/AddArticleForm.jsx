import style from './styles.module.css';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAddNewPost, fetchEditPost } from '../../redux/slice/posts';
import axios from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddArticleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [subject, setSubject] = useState('');
  const [author, setAuthor] = useState('');
  const [comments, setComments] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();

  const isEditing = Boolean(id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditing) {
      dispatch(fetchAddNewPost({ text, title, subject, author }));
      navigate('/');
    } else {
      dispatch(fetchEditPost({ id, text, title, subject, author, comments, atCreated: date }));
      navigate('/');
    }
  };

  useEffect(() => {
    axios.get(`/posts/${id}`).then(({ data }) => {
      setTitle(data.title);
      setText(data.text);
      setSubject(data.subject);
      setAuthor(data.author);
      setComments(data.comments);
      setDate(data.atCreated);
    });
  }, []);

  return (
    <div className={style.container}>
      <form style={{ width: '100%' }} onSubmit={handleSubmit}>
        <div className={style.wrapInput}>
          <input
            className={style.titleInput}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Заголовок статьи..."
          />
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
            placeholder="Введите текст..."
          />
          <input
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
            type="text"
            placeholder="Тема статьи..."
          />
          <input
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            type="text"
            placeholder="Имя автора..."
          />
        </div>
        <div className={style.btn}>
          <button type="submit">{isEditing ? 'Сохранить' : 'Опубликовать'}</button>
        </div>
      </form>
    </div>
  );
}

export default AddArticleForm;
