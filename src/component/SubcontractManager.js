import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SubconMain from "./SubcontractManager/SubconMain";
import AddSubcontractor from './SubcontractManager/AddSubcon';


function SubcontractManager() {
    return (
        <div>
            <Router>
               <Switch>
                   <Route path='/SubcontractManager' exact component={SubconMain}>
                       <SubconMain/>
                   </Route> 

                   <Route path='/addSubcon' >
                       <AddSubcontractor/>
                   </Route>

               </Switch>
            </Router>
        </div>
    )
}

export default SubcontractManager
