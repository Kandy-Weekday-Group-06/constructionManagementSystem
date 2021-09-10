import React from 'react';
import {Button,Container,Row,Col,Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import addsubconMainpic from "../SubcontractManager/Images/single.PNG";
import teamsubconMainpic from "../SubcontractManager/Images/team.PNG";
import reportsubconMainpic from "../SubcontractManager/Images/19197292.jpg";

function SubconMain() {

  return (


    <div style={{backgroundColor : ' #f5f6fa'}}>
        
         <br/>
         <br/>
         <br/>
       <div className="container">
       <br/>
         <br/>
       <div className="container" style={{backgroundColor : 'white'}}>
            
        <Container>
        <Row>
          <br/>
          <br/>
          <br/>
       
        </Row>
         <Row>
         <Col></Col>
         <Col></Col>
         <Col></Col>
         
          <Col xs={6} md={3}>
              <Image src={addsubconMainpic} fluid className= "addsubconMainpic" thumbnail roundedCircle style={{width: 200,height: 200}}/> 
              <Link to='/adminPannel/SubcontractManager/addSubcon'  className="link1" >
              <>
              <Button variant="outline-dark">Add New Subcontractor</Button>{' '}
              </>
              </Link>
         </Col>
        <Col></Col>
      
         <Col xs={6} md={4}>
             <Image src={teamsubconMainpic} fluid className= "addsubconMainpic" thumbnail roundedCircle style={{width: 200,height: 200}}/> 
             <Link to='/adminPannel/SubcontractManager/displaySubcontractors'  className="link1" >
             <>
              <br/>
              <Button variant="outline-dark">Subcontractor's Details</Button>{' '}
            </>
            </Link>
         </Col>

         <Col xs={6} md={4}>
             <Image src={reportsubconMainpic} fluid className= "addsubconMainpic" thumbnail roundedCircle style={{width: 200,height: 200}}/> 
             <>
              <Button variant="outline-dark">Subcontractor's Payments Report</Button>{' '}
            </>
         </Col>        
      </Row>
       <br/>
       <br/>
       <Row>
       </Row>
      </Container>
      </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>


  );



}

export default SubconMain;