import React from 'react';
import {Button,Container,Row,Col,Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


function SubconMain() {

  return (


    <div>
        
         <br/>
         <br/>
         <br/>
       <div className="container">
       <div className="container">
            
        <Container>
         <Row>
          <Col xs={6} md={4}>
              <Image src="./assets/img/subcontract/are-you-liable-for-subcontractor-work.jpg" thumbnail roundedCircle/> 
              <Link to='/addSubcon'  className="link1" >
              <>
              <Button variant="outline-dark">Add New Subcontractor</Button>{' '}
              </>
              </Link>
         </Col>
         
         <Col xs={6} md={4}>
             <Image src="./assets/img/subcontract/Construction team working on site.jpg" thumbnail roundedCircle/> 
             <Link to='/displaySubcon'  className="link1" >
             <>
              <Button variant="outline-dark">Subcontractor's Details</Button>{' '}
            </>
            </Link>
         </Col>

         <Col xs={6} md={4}>
             <Image src="./assets/img/subcontract/hh.jpg" thumbnail roundedCircle/> 
             <>
              <Button variant="outline-dark">Subcontractor's Payments</Button>{' '}
            </>
         </Col>        
      </Row>
       <br/>
       <br/>
       <Row>
          <Col xs={6} md={4}>
              <Image src="./assets/img/subcontract/building-construction-cartoon-vector-10628999.jpg" thumbnail roundedCircle/> 
              <>
               <Button variant="outline-dark">Assign to a project</Button>{' '}
              </>
         </Col>

         <Col xs={6} md={4}>
             <Image src="./assets/img/subcontract/4775.jpg" thumbnail roundedCircle/> 
             <>
              <Button variant="outline-dark">Prasad</Button>{' '}
              </>
         </Col>

         <Col xs={6} md={4}>
             <Image src="./assets/img/subcontract/4775.jpg" thumbnail roundedCircle/> 
             <>
              <Button variant="outline-dark">Prasad</Button>{' '}
            </>
         </Col>

       </Row>
      </Container>
      </div>
      </div>
    </div>


  );



}

export default SubconMain;