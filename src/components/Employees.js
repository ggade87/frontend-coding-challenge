import React from 'react';
import classes from "./Employees.module.css";
import PropTypes from 'prop-types';

const Employees = ({ employees, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (<div>
    <table className={classes.employees}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Member name</th>
          <th>Type of absence</th>
          <th>Period</th>
          <th>Member note</th>
          <th>Status </th>
          <th>Admitter note </th>
        </tr>
      </thead>
      <tbody>
        {employees.map((data, index) => {
          return <tr key={index}>
            <td>{data.userId} </td>
            <td>{data.name} </td>
            <td>{data.type}</td>
            <td>{data.period}</td>
            <td>{data.memberNote}</td>
            <td>{data.status}, </td>
            <td>{data.admitterNote}</td>
          </tr>
        })}
      </tbody>
    </table></div>
  );
};

export default Employees;

Employees.propTypes = {
  employees: PropTypes.array,
  loading: PropTypes.bool,
}