import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Container, Row,Col} from "react-bootstrap";
import EmpHome from './EmpHome';
import ReportHome from './ReportHome';
import EmployeeProject from './EmployeeProject';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import DisplayEmployee from './DisplayEmployee';
import EmployeeProfile from './EmployeeProfile';
import PageHeader from './PageHeader';
import EmployeeMainNavigation from './EmployeeMainNavigation';
import { useState, useEffect } from "react";


export default function EmployeeManager() {

    const [editEmployee, setEditEmployee] = useState("");
    const [viewEmployee, setViewEmployee] = useState("");

    function editEmployeeHandler(EmpID) {
        setEditEmployee(EmpID);
    }

    function viewEmployeeHandler(EmpName) {
        console.log("Employee Name", EmpName);
        setViewEmployee(EmpName);
    }

    return (
        <div>
            <Router>
                <div className = "supplierManagerBgDiv" >

                <br/> <br/> 

            <Container fluid>
                <Row>
                    <Col md = "2" xs = "4" sm= "3" >
                    <br/>
                        <EmployeeMainNavigation/>
                    </Col>

                    <Col md = "10" xs = "8" sm = "9" className = "supplierMainVeritcalDiv">
                    <br/>

                <Switch>

                    <Route exact path='/adminPannel/EmployeeManager/EmpHome'  component={EmpHome}>
                        <EmpHome></EmpHome>
                    </Route>

                    <Route exact path = '/adminPannel/EmployeeManager/ReportHome' component = {ReportHome}>
                        <ReportHome></ReportHome>
                    </Route>

                    <Route  path ='/adminPannel/EmployeeManager/EmployeeProject' component = {EmployeeProject}>
                        <EmployeeProject></EmployeeProject>
                    </Route>

                    <Route path = '/adminPannel/EmployeeManager/DisplayEmployee' component = {DisplayEmployee}>
                        <DisplayEmployee editEmployeeHandler = {editEmployeeHandler}
                                         viewEmployeeHandler = {viewEmployeeHandler}/>
                    </Route>

                    <Route  path = '/adminPannel/EmployeeManager/AddEmployee'  component = {AddEmployee}>
                        <AddEmployee />
                    </Route>

                    <Route exact path = '/adminPannel/EmployeeManager/EditEmployee' component = {EditEmployee}>
                        <EditEmployee id={editEmployee}/>
                    </Route>

                    <Route path = '/adminPannel/EmployeeManager/EmployeeProfile' component = {EmployeeProfile}>
                        <EmployeeProfile name = {viewEmployee} />
                    </Route>

                </Switch>

                </Col>
            </Row>
        </Container>
   
        </div>

        </Router>
    </div>
    )
}

