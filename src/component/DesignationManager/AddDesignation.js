import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "../../firebase";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const db = firebase.firestore();

function AddDesignation(){

  const [designation,setDesignation] = useState("");
  const [basicSalary,setBasicSalary] = useState("");
  const [description, setDescription] = useState("");

  function sendData(e){
    
    e.preventDefault();

    const newDesignation = {
      designation,
      basicSalary,
      description
    }
  
    db.collection("Designation").add(newDesignation).then(()=>{
      alert('data added');
    }).catch((err)=>{
      alert(err.message);
    });

    setDescription("");
    setDescription("");
    setBasicSalary("");
  }

  return(
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Designation</Form.Label>
            <Form.Control onChange={(e)=>{setDesignation(e.target.value)}} type="email" placeholder="Enter the designation" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Basic Salary</Form.Label>
            <Form.Control onChange={(e)=>{setBasicSalary(e.target.value)}} type="email" placeholder="Enter the designation" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control onChange={(e)=>{setDescription(e.target.value)}} as="textarea" rows={3} />
          </Form.Group>
          <Button onClick={sendData} variant="primary" type="submit"> Submit</Button>
        </Form>
      </div>
  )
}

export default AddDesignation