import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "../../firebase";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Container, FormGroup, Row } from 'react-bootstrap';
import { Route, Switch, NavLink, Link} from 'react-router-dom';
import img1 from "./images/57279.jpg";

const db = firebase.firestore();

function AddDesignation(){

  const [designation,setDesignation] = useState("");
  const [basicSalary,setBasicSalary] = useState("");
  const [status, setStatus] = useState("");

  function sendData(e){
    
    e.preventDefault();

    const newDesignation = {
      designation,
      basicSalary,
      status
    }
  
    db.collection("Designation").add(newDesignation).then(()=>{
      alert('data added');
    }).catch((err)=>{
      alert(err.message);
    });

    setDesignation("");
    setStatus("");
    setBasicSalary("");
  }

  async function validateInput(ab){
    
    var x=typeof (ab);
    if(x == "string"){
      alert("Enter a number");
    }
  }

  return(

      <div>
        <Container>
          <Row>
            <Col>
              <Form style={{margin:"80px 50px 50px 100px",}}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control p-md onChange={(e)=>{setDesignation(e.target.value)}} type="text" placeholder="Enter the designation" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Basic Salary</Form.Label>
                  <Form.Control onChange={(e)=>{setBasicSalary(e.target.value); validateInput(e.target.value)}}  type="number" placeholder="Enter basic salary" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Status</Form.Label>
                  <Form.Control as="select" onChange={(e)=>{setStatus(e.target.value)}}>
                      <option>contracted</option>
                      <option>no-contracted</option>
                  </Form.Control>
                </Form.Group>
                <br/>

                <Link to='/AdminPannel/DesignationManager'><Button style={{color:"#ffffff",backgroundColor:"#f0ad4e"}} onClick={sendData} variant="primary" type="submit"> Submit</Button></Link> 
              </Form>
            </Col>
            <Col>
              <img style={{margin:"80px 50px 50px 100px", width:"80%", height:"80%",}} src={img1} alt="mysvg" ></img>
            </Col>
          </Row>
        </Container>
        
      </div>
  )
}

export default AddDesignation