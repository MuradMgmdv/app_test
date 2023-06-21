import styles from './styles.module.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Arrow } from '../Arrow/Arrow.jsx';
import { useEffect } from 'react';
import { searchByName, searchBySubject } from '../../redux/slice/posts';

function Search() {
  const { posts } = useSelector((state) => state.posts);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchByName(title));
  }, [title]);

  useEffect(() => {
    dispatch(searchBySubject(subject));
  }, [subject]);

  useEffect(() => {}, [date]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`${styles.container} ${isOpen ? styles.open : ''}`}>
      <div onClick={() => setIsOpen((prev) => !prev)} className={styles.head}>
        <span>Фильтр</span>
        <Arrow className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`} />
      </div>
      <div className={`${styles.inputGroup}`}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите заголовок"
        />
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Введите название темы"
        />
      </div>
    </div>
  );
}

export default Search;
