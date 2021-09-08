import React, { useState } from "react";
import firebase from "../../firebase";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AddClient() {
  const [clientName, setClientName] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const db = firebase.firestore();

  function sendData(e) {
    e.preventDefault();
    alert("Done!");
    const newClient = {
      clientName,
      representativeName,
      phone,
      email,
      address,
    };
    console.log(newClient);

    db.collection("clients")
      .doc()
      .set(newClient)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    setClientName("");
    setRepresentativeName("");
    setPhone("");
    setEmail("");
    setAddress("");
  }

  return (
    <div className="container">
      <br />
      <Link to="/adminPannel/ClientManager">
        <Button variant="primary">Back</Button>
      </Link>
      <br />
      <center>
        <h2 style={{ color: "#f0ad4e" }}>Add New Client</h2>
      </center>
      <Form onSubmit={sendData}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Individual's Full Name/ Organization's Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="example: Prad Bitt"
            value={clientName}
            onChange={(e) => {
              setClientName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label>Representative's Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="example: Bangelina Molie"
            value={representativeName}
            onChange={(e) => {
              setRepresentativeName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPhoneNo">
          <Form.Label>Individual's/ Representative's Contact Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="example: +94 42 042 0420"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Individual's/ Representative's Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="example: bangelina.molie@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Individual's/ Organization's Physical Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="example: Shawnee, Oklahoma, USA."
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </Form.Group>

        <Button variant="warning" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddClient;
