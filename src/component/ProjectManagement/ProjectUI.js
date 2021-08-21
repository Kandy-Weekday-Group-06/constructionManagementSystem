import React,{useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AddProject from './Add_Project';
import RetProject from '../ProjectManagement/Ret_Project';
import UpProject from './Update_Pro';
import Ongoing from './Ongoing';
import Header from './Nav';



function ProjectUI() {
      const [currentPro, setCurrent] = useState("");

      function CurrentProject(cid) {
            console.log("Current Project id", cid);
            setCurrent(cid);
          }
      
    return (
        
        <div>
            
        <Router>
           
             <Header/>
            
            

            <Route path="/ProjectManagement/Add" >
                  <AddProject/>
            </Route>
            
            <Route path="/ProjectManagement/RetProject" >
                  <RetProject currentid={currentPro} />
            </Route>
            <Route path="/ProjectManagement/UpdatePro">
                  <UpProject/>
            </Route>

            <Route path="/ProjectManagement/Ongoing">
                  <Ongoing CurrentProject={CurrentProject} />
            </Route>
     
        </Router>
   
        </div>
        
        
    )
}

export default ProjectUI;
