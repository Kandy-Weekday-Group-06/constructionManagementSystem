import React from 'react'
import Employee from './employeeSalary'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SalaryReport from './salaryReport';
import { useState, useEffect } from 'react';

function EmployeeManager() {

    const[month,setMonth]= useState("");
    const[year,setYear]=useState("");

    function setDetailsMain(year,month){
      setYear(year);
      setMonth(month);
      console.log("inside employeeManager", month,year);
  
    }

    return (
        <div>
            <Router>
            <Switch>
              <Route path='/AdminPannel/EmployeeManager' exact component={Employee}>
                <Employee setDetailsMain={setDetailsMain}/>
              </Route>
              <Route path='/adminPannel/EmployeeManager/salaryReport' component={SalaryReport}>
                <SalaryReport year={year} month={month} />
              </Route>

            </Switch>
            </Router>
        </div>
    )
}

export default EmployeeManager