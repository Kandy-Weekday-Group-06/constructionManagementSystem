import React from "react";
import Home from "./component/Home/Home";
import Header from "./component/Header/Header";
import AdminPannel from "./component/AdminPannel/AdminPannel";
import AttendanceManager from "./component/AttendanceManager/AttendanceManager";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProjectManager from "./component/ProjectManagement/ProjectUI";
import DesignationManager from "./component/DesignationManager/DesignationManager";
import ClientManager from "./component/ClientManager";
import SupplierManager from "./component/SupplierManager/SupplierManager";
import SubcontractManager from "./component/SubcontractManager/SubcontractManager";
import EmployeeManager from "./component/employeeManager/employeeManager";


//Headers-----------Import
import AttendanceHeader from './component/Header/attendanceHeader';








function App() {
  //edit part of the designation manager

  return (
    <div className="App">
      <Router>

        
        {/* <Route path='/adminPannel/attendanceManager' component={AttendanceHeader}/> */}
        <Route path='/adminPannel' component={Header}/>



        <Switch>
          <Route path="/" exact component={Home}>
            <Home />
          </Route>
          <Route path="/adminPannel" exact component={AdminPannel}>
            <AdminPannel />
          </Route>

          <Route
            path="/adminPannel/attendanceManager"
            component={AttendanceManager}
          >
            <AttendanceManager />
          </Route>

          <Route
            path="/adminPannel/DesignationManager"
            component={DesignationManager}
          >
            <DesignationManager />
          </Route>

          <Route path='/adminPannel/EmployeeManager' component={EmployeeManager}>
            <EmployeeManager/>
          </Route>

          <Route path="/adminPannel/ProjectManagement" exact component={ProjectManager}>
            <ProjectManager />
          </Route>

          <Route path="/adminPannel/ClientManager" component={ClientManager}>
            <ClientManager />
          </Route>

          <Route path = "/adminPannel/supplierManager" component = {SupplierManager}>
            <SupplierManager/>
          </Route>
        </Switch>

        <Route 
            path="/adminPannel/SubcontractManager" component={SubcontractManager}>
            <SubcontractManager/>
          </Route>

      </Router>
    </div>
  );
}

export default App;
