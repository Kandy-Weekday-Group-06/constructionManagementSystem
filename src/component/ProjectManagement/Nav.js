import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {  Link } from "react-router-dom";

export default function Navigation(){

  

    return(
      
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Costruction Management</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                <Link className="nav-link" to="/ProjectManagement/Add">Add Project</Link>
                <Link className="nav-link" to="/ProjectManagement/UpdatePro">Update Project</Link>
                <Link className="nav-link" to="/ProjectManagement/RetProject"> Ret Project</Link>
                <Link className="nav-link" to="/ProjectManagement/Ongoing">Ongoing Project</Link>
                
            </div>
            </div>
        </div>
        </nav>


        
  
   
 
    );
}