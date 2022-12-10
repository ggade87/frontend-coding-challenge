import React from 'react';
import classes from "./Pagination.module.css";
const Pagination = ({ employeesPerPage, totalemployees, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalemployees / employeesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={classes.pagination}>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
