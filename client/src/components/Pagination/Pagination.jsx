import React from 'react';
import style from './styles.module.css';

function Pagination({ postsPage, totalPost, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postsPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className={style.pagination}>
        {pageNumbers.map((number) => (
          <li className={style.item} key={number} onClick={() => paginate(number)}>
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
