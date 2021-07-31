import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AddPayment() {
  const [clientId, setClientId] = useState("");
  const [clientIds, setClientIds] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [projectIds, setProjectIds] = useState([]);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const db = firebase.firestore();

  useEffect(() => {
    db.collection("clients").onSnapshot((snapshot) => {
      const arr = snapshot.docs.map((doc) => doc.id);
      setClientIds(arr);
    });
  }, [db]);

  useEffect(() => {
    db.collection("projects").onSnapshot((snapshot) => {
      const arr = snapshot.docs.map((doc) => doc.id);
      setProjectIds(arr);
    });
  }, [db]);

  function sendData(e) {
    e.preventDefault();

    alert("Done!");

    const newPayment = {
      clientId,
      projectId,
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

    setClientId("");
    setProjectId("");
    setDate("");
    setAmount("");
  }

  return (
    <div className="container">
      <Form onSubmit={sendData}>
        <Form.Control
          as="select"
          onChange={(e) => {
            setClientId(e.target.value);
          }}
        >
          <option value="">selectClientId</option>
          {clientIds.map((clientId) => (
            <option value={clientId}>{clientId}</option>
          ))}
        </Form.Control>

        <Form.Control
          as="select"
          onChange={(e) => {
            setProjectId(e.target.value);
          }}
        >
          <option value="">selectProjectId</option>
          {projectIds.map((projectId) => (
            <option value={projectId}>{projectId}</option>
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
          <Form.Label>EmployeeName</Form.Label>
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
