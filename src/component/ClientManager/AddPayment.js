import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AddPayment() {
  const [clientName, setClientName] = useState("");
  const [clientNames, setClientNames] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectNames, setProjectNames] = useState([]);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const db = firebase.firestore();

  useEffect(() => {
    db.collection("clients").onSnapshot((snapshot) => {
      const arr = snapshot.docs.map((doc) => doc.data().clientName);
      setClientNames(arr);
    });
  }, [db]);

  useEffect(() => {
    db.collection("Con_Project").onSnapshot((snapshot) => {
      const arr = snapshot.docs.map((doc) => doc.data().Title);
      setProjectNames(arr);
    });
  }, [db]);

  function sendData(e) {
    e.preventDefault();

    alert("Done!");

    const newPayment = {
      clientName,
      projectName,
      date,
      amount,
    };

    console.log(newPayment);

    db.collection("payments")
      .doc()
      .set(newPayment)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    setClientName("");
    setProjectName("");
    setDate("");
    setAmount("");
  }

  return (
    <div className="container">
      <Form onSubmit={sendData}>
        <Form.Control
          as="select"
          onChange={(e) => {
            setClientName(e.target.value);
          }}
        >
          <option value="">Select Client Name</option>
          {clientNames.map((clientName) => (
            <option value={clientName}>{clientName}</option>
          ))}
        </Form.Control>

        <Form.Control
          as="select"
          onChange={(e) => {
            setProjectName(e.target.value);
          }}
        >
          <option value="">Select Project Name</option>
          {projectNames.map((projectName) => (
            <option value={projectName}>{projectName}</option>
          ))}
        </Form.Control>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="example: 2021/7/22"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="example: 100000"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddPayment;
