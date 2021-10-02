import React,{useEffect,useState} from 'react';
import '../../assets/css/home/bootstrap.min.css';
import '../../assets/css/home/agency.min.css';
import {  Link } from "react-router-dom";
import { NavDropdown} from 'react-bootstrap';


import './Header.css'
//attendanceHeader
function ProjectManagerHeader() {
    useEffect(() => {
        
    }, [])

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark Header__height py-lg-1" id="mainNav" >
                <div className="container">
                <a className="navbar-brand" href="#page-top"><img className="Header_imageWidth" src="../../assets/img/7a67f2976c750a4c9055d4bf1dc646aa.png" alt="..." /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fa fa-bars ms-1"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                    <li className="nav-item"><Link to='/'  className="nav-link" >Home</Link></li>
                    
                    <li className="nav-item"><Link to='/adminPannel'  className="nav-link" >Admin Pannel</Link></li>
                    <li className="nav-item">   
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Project mannger"
                            menuVariant="dark"
                            >
                               
                                

                            <Link to='/adminPannel/ProjectManagement'  className="nav-link" >
                                <NavDropdown.Item href="#action/3.1" >
                                Ongoing
                                </NavDropdown.Item>
                            </Link>    
                            
                             

                            
                        </NavDropdown>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
        </div>
    )
}

export default ProjectManagerHeader