import React,{UseSate, useState} from 'react';

import { Route } from "react-router-dom";
import './attendancemanager.css';
import AttendanceManagerPannel from './AttendanceManagerPannel';
import MarkArriving from './MarkArriving';
import MarkLeaving from './MarkLeaving';
import EditAttendance from './editAttendance';

function AttendanceManager() {
    const [editingAttendanceEmpID, setEditingAttendanceEmpID] = useState("");
    const [editingAttendanceDate, setEditingAttendanceDate] = useState("");

    function editAttendaceHandler(EmpID,datee){
        console.log("EmpID in Attendancemanager>>>>>>>>>",EmpID,datee);
        setEditingAttendanceEmpID(EmpID);
        setEditingAttendanceDate(datee);
    }

    return (
        <div className="">
            
            <Route path='/adminPannel/attendanceManager/attendanceManagePanel' component={AttendanceManagerPannel}>
                <AttendanceManagerPannel/>
            </Route>
            <Route path='/adminPannel/attendanceManager/markArriving' component={MarkArriving}>
                <MarkArriving editAttendaceHandler={editAttendaceHandler}/>
            </Route>
            <Route path='/adminPannel/attendanceManager/markLeaving' component={MarkLeaving}>
                <MarkLeaving/>
            </Route> 
            <Route path='/adminPannel/attendanceManager/EditAttendance' component={EditAttendance}>
                <EditAttendance employeeID={editingAttendanceEmpID} editingAttendanceDate={editingAttendanceDate}/>
            </Route>          
                    
                
            
        </div>
    )
}

export default AttendanceManager;
