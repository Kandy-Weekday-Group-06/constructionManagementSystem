import React, { useState, useEffect } from 'react'
import ClientManager from './component/ClientManager';
import SubcontractManager from './component/SubcontractManager';
import Home from './component/Home/Home';
import Header from './component/Header/Header';
import AdminPannel from './component/AdminPannel/AdminPannel';
import AttendanceManager from './component/AttendanceManager/AttendanceManager';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RetrieveDesignations from './component/DesignationManager/RetrieveDesignations';
import AddDesignation from './component/DesignationManager/AddDesignation';
import EditDesignation from './component/DesignationManager/EditDesignations';

function App() {
  
  //edit part of the designation manager
  const [editingDesignation, setEditingDesignation] = useState("");

  function EditDesignationHandler(ID){
    console.log("DesignationID in app.js>>>>>>>>>",ID);
    setEditingDesignation(ID);
  }
  
  return (
    <div className="App">
      
      
     
      <Router>
        <Route path='/adminPannel' component={Header}/>
           

        <Switch>
          <Route path='/' exact component={Home} >
            <Home/>
          </Route>
          <Route path='/adminPannel' exact component={AdminPannel} >
            <AdminPannel/>
          </Route>
          <Route path='/ClientManager' exact component={ClientManager}>
            <ClientManager/>
          </Route>

          <Route path='/adminPannel/attendanceManager' component={AttendanceManager}>
            <AttendanceManager/>
          </Route>
          

          <Route path='/SubcontractManager' exact component={SubcontractManager}>
            <SubcontractManager/>
          </Route>


          <Route path='/AdminPanel/EmployeeManager/' exact component={RetrieveDesignations}>
            <RetrieveDesignations EditDesignationHandler={EditDesignationHandler}/>
          </Route>
          <Route path='/AdminPanel/EmployeeManager/edit'>
            <EditDesignation id={editingDesignation}></EditDesignation>
          </Route>
          <Route path='/AdminPanel/EmployeeManager/add'>
            <AddDesignation></AddDesignation>
          </Route>
          
        </Switch>
      
    
      </Router>
    
      
    </div>
  );
}

export default App;
