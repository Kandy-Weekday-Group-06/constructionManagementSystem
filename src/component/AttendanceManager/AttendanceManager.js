import React from 'react';

import { Route } from "react-router-dom";
import './attendancemanager.css';
import AttendanceManagerPannel from './AttendanceManagerPannel';
import MarkArriving from './MarkArriving';
import MarkLeaving from './MarkLeaving';

function AttendanceManager() {
    return (
        <div className="">
            
            <Route path='/adminPannel/attendanceManager/attendanceManagePanel' component={AttendanceManagerPannel}>
                <AttendanceManagerPannel/>
            </Route>
            <Route path='/adminPannel/attendanceManager/markArriving' component={MarkArriving}>
                <MarkArriving/>
            </Route>
            <Route path='/adminPannel/attendanceManager/markLeaving' component={MarkLeaving}>
                <MarkLeaving/>
            </Route>           
                    
                
            
        </div>
    )
}

export default AttendanceManager;
