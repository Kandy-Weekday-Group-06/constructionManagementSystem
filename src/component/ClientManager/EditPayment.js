import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function EditPayment(props) {
  const db = firebase.firestore();

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientNames, setClientNames] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectNames, setProjectNames] = useState([]);
  const [paymentId, setPaymentId] = useState(props.id);

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

  useEffect(() => {
    db.collection("payments")
      .doc(paymentId.toString())
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setClientName(doc.data().clientName);
          setProjectName(doc.data().projectName);
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
      clientName,
      projectName,
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
          value={clientName}
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
          value={projectName}
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

export default EditPayment;
