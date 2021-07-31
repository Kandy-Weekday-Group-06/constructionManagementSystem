import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function EditPayment(props) {
  const db = firebase.firestore();

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientIds, setClientIds] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [projectIds, setProjectIds] = useState([]);
  const [paymentId, setPaymentId] = useState(props.id);

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

  useEffect(() => {
    db.collection("payments")
      .doc(paymentId.toString())
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setClientId(doc.data().clientId);
          setProjectId(doc.data().projectId);
          setDate(doc.data().date);
          setAmount(doc.data().amount);
        } else {
          // doc.data() will be undefined in this case

          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [db, paymentId]);

  function editdata(e) {
    e.preventDefault();

    alert("editdone");

    const updatedPayment = {
      clientId,
      projectId,
      date,
      amount,
    };

    console.log(updatedPayment);

    db.collection("payments").doc(paymentId).update(updatedPayment);
  }

  return (
    <div className="container">
      <h1>Edit payment:{paymentId}</h1>

      <Form onSubmit={editdata}>
        <Form.Control
          as="select"
          value={clientId}
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
          value={projectId}
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

export default EditPayment;
