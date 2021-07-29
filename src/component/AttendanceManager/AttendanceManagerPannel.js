import React from 'react';
import {  Link } from "react-router-dom";
import { Button ,Container,Row} from 'react-bootstrap';
import './attendancemanager.css';


function AttendanceManagerPannel() {
    return (
        <div>
            <Row className="justify-content-md-center mt-5">
                <h1 className="text-center text-warning">Employee Attendance</h1>
            </Row>
                        
            
            <Container className="width500px mt-5 bg-white p-5 rounded" >
                <Row className="justify-content-md-center ">
                    <div className="w-100 align-middle mh-100">
                        <Link to='/adminPannel/attendanceManager/markArriving'  className="nav-link" >
                            <Row className="justify-content-md-center">
                                <Button className="attendanceManager__mainButton" variant="outline-warning">Mark arriving attendace</Button>
                            </Row>                
                        </Link>
                        <Link to='/adminPannel/attendanceManager/markLeaving'  className="nav-link" >
                            <Row className="justify-content-md-center">
                                <Button className="attendanceManager__mainButton" variant="outline-warning">Mark leaving attendace</Button>
                            </Row>                
                        </Link>
                        <Link to='/adminPannel/attendanceManager'  className="nav-link" >
                            <Row className="justify-content-md-center">
                                <Button className="attendanceManager__mainButton" variant="outline-warning">Mark mark today as a holliday</Button>
                            </Row>                   
                        </Link>
                       
                        
                        
                    </div>
                </Row>
            </Container>
            
        </div>
    )
}

export default AttendanceManagerPannel
