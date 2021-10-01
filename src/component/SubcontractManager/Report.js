import React from 'react';

import { Table, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import {  Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import firebase from '../../firebase';




function Report(props) {
    
  const db = firebase.firestore();
   
    const [subcontractors, setSubcontractors] = useState([]);

    const [viewingReport, setViewingReport] = useState(props);


    useEffect(() => {

        db.collection("subcontractors").onSnapshot((snapshot)=>{
      
            const arr =snapshot.docs.map((doc) =>({

              ID:doc.id,
              data:doc.data(),
            }));
            setSubcontractors(arr);    
          });   
    }, [db]);

     function viewReport(name) {
        viewingReport.viewReportHandler(name);
      }
    

    return (
        <div>
           <div class="container">   
             <br/>
             <h3 style={{color: '#ffb84d',}}>Payment Details</h3>
             <br/>
             <br/>
             <h3 style={{backgroundColor: '#404040',color: '#ffb84d',padding: "7px"}}>
               </h3>
             <Table striped bordered hover>
                <thead>
                  <tr class="p-3 mb-2 bg-warning text-dark"> 
                   <th>Company Name</th>    
                   <th>Type</th>
                   <th> </th>
                  </tr>
               </thead>
               <tbody>
               {subcontractors.map((subcontractor)=>(
                  
                  <tr>
                      <td>{subcontractor.data.comName}</td>
                      <td>{subcontractor.data.type}</td>
                    
                       
                        <Link to='/adminPannel/SubcontractManager/ViewReport'>
                        <Button  variant="warning"
                                onClick={() => {viewReport(subcontractor.data.comName)}}>
                          Payment Details Report
                        </Button>
                        </Link>
                   </tr>
                  
                ))}
                </tbody>
              
               <br/>
               <br/>
               </Table>
          </div>
        </div>
   )
  

}


export default Report;