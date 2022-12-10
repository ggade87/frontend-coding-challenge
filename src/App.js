import React, { useState, useEffect } from 'react';
import Employees from './components/Employees';
import Pagination from './components/Pagination';
import './App.css';
import { getAbsenceData, getAbsenceTypes } from './api/api';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatDate}  from './components/lib/Common';
const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [absenceTypes, setAbsenceTypes] = useState([]);
  const [abType, setAbType] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      const data = getAbsenceData();
      setEmployees(data);
      const aTypes = getAbsenceTypes();
      console.log(aTypes)
      setAbsenceTypes(aTypes);
      setLoading(false);
    };
    fetchEmployees();
  }, []);

  const indexOfLastPost = currentPage * employeesPerPage;
  const indexOfFirstPost = indexOfLastPost - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    setCounter(pageNumber - 1);
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(employees.length / employeesPerPage); i++) {
    pageNumbers.push(i);
  }

  function Prev() {
    if (counter >= 1) {
      const cnt = counter - 1;
      setCurrentPage(pageNumbers[cnt]);
      setCounter(cnt)
    }
  }

  function Next() {
    if (counter < pageNumbers.length - 1) {
      const cnt = counter + 1;
      setCurrentPage(pageNumbers[cnt]);
      setCounter(cnt)
    }
  }
  
  function Search() {
    var data = getAbsenceData();
    if (abType != "") {
      data= data.filter(x => x.type == abType);
    }

    if(selectedDate != null){
        let date = formatDate(selectedDate);
        data = data.filter(x => x.startDate <= date && x.endDate >= date);
    }
    setEmployees(data);
  }

  function onTypeSelect(e) {
    setAbType(e.target.value);
  }

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>Employees</h1>
      <table>
        <tr>
          <td>Absence Types</td><td>
            <select
              value={abType}
              onChange={onTypeSelect}
            >
              <option key={-1} value="">
              </option>
              {absenceTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </td>
          <td>Date </td><td>
            <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
          </td>
          <td><button onClick={Search} >Search</button></td>
        </tr>
      </table>

      {employees.length == 0 ? ("Records not found.") : (
        <div className="container">
          <div className="row">
            <div className="column">
              <Employees employees={currentEmployees} loading={loading} />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <button className='btn' onClick={Prev}>
                Prev
              </button>
              <button className='btn' onClick={Next}>Next</button>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <Pagination
                employeesPerPage={employeesPerPage}
                totalemployees={employees.length}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      )
      }
    </div>
  );
};

export default App;
