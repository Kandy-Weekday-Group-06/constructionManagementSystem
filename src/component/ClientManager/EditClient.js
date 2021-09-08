import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function EditClient(props) {
  const [clientName, setClientName] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const db = firebase.firestore();
  const [clientId, setClientId] = useState(props.id);

  useEffect(() => {
    db.collection("clients")
      .doc(clientId.toString())
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setClientName(doc.data().clientName);
          setRepresentativeName(doc.data().representativeName);
          setPhone(doc.data().phone);
          setEmail(doc.data().email);
          setAddress(doc.data().address);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [db, clientId]);

  function editdata(e) {
    e.preventDefault();
    alert("editdone");
    const updatedClient = {
      clientName,
      representativeName,
      phone,
      email,
      address,
    };
    console.log(updatedClient);

    db.collection("clients").doc(clientId).update(updatedClient);
  }

  return (
    <div className="container">
      <br />
      <Link to="/adminPannel/ClientManager">
        <Button variant="primary">Back</Button>
      </Link>
      <br />
      <center>
        <h2 style={{ color: "#f0ad4e" }}>Edit Client</h2>
      </center>
      <Form onSubmit={editdata}>
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

export default EditClient;
