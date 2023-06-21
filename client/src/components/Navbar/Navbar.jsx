import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <span onClick={() => navigate('/')}>Статьи</span>
      <button onClick={() => navigate('/add-post')}>Добавить статью</button>
    </div>
  );
};
