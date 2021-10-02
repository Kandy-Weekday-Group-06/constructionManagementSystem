import React from 'react';
import {Button,Table,Row,Col,Image,Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

import addsubconpic from "../SubcontractManager/Images/4775.jpg"

function SubconMain() {

  return (


    <div style={{backgroundColor : ' #f5f6fa'}}>
        
        
       <div className="container">
       <br/>
        <div style={{color: '#ffb84d'}}> <h2 >Subcontractors </h2> </div>
         <br/>
       <div className="container" style={{backgroundColor : 'white',width: 900,height: 400}}>
       <br/>
       <br/>   <br/>
       <br/>   <br/>
              
       <Container>
        <Row>
          <Col >
             
          <Link to='/adminPannel/SubcontractManager/addSubcon'  className="link1" >
              <>
              <Button variant="outline-dark">Add New Subcontractor</Button>{' '}
              </>
              </Link>
              <br/>
              <br/>
             <Link to='/adminPannel/SubcontractManager/displaySubcontractors'  className="link1" >
             <>
              <Button variant="outline-dark">Subcontractor's Details</Button>{' '}
            </>
            </Link>
            <br/>
            <br/>
              <Link to='/adminPannel/SubcontractManager/report'  className="link1" >
              <>
              <Button variant="outline-dark">Payments Report</Button>{' '}
              </>
              </Link>
          </Col>
          <Col>
          <Image src={addsubconpic} fluid className= "addsubconpic" thumbnail style={{border:"none"}}/>
          </Col>
          
       </Row>
  
       </Container>       
       
      </div>
     </div>
    </div>


  );



}

export default SubconMain;