import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function DisplayPayments(props) {
  const [payments, setPayments] = useState([]);
  const db = firebase.firestore();
  const [editingPayment, setEditingPayment] = useState(props);

  useEffect(() => {
    db.collection("payments").onSnapshot((snapshot) => {
      const arr = snapshot.docs.map((doc) => ({
        ID: doc.id,
        data: doc.data(),
      }));

      console.log(arr);
      setPayments(arr);
    });
  }, [db]);

  function deletePayment(ID) {
    db.collection("payments")
      .doc(ID)
      .delete()
      .then(() => {
        alert(ID, "Document successfully deleted!");
      })
      .catch((err) => {
        console.error("Error removing document: ", err);
      });
  }

  function editPayment(id) {
    alert("edit pay", id);
    editingPayment.editPaymentHandler(id);
  }

  return (
    <div>
      <Link to="/ClientManager/AddPayment">
        <Button variant="link">Add New Payment</Button>
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ display: "none" }}>Document ID</th>
            <th>ClientName</th>
            <th>ProjectName</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr>
              <td style={{ display: "none" }}>{payment.ID}</td>
              <td>{payment.data.clientName}</td>
              <td>{payment.data.projectName}</td>
              <td>{payment.data.date}</td>
              <td>{payment.data.amount}</td>
              <td>
                <Button
                  variant="link"
                  onClick={() => {
                    deletePayment(payment.ID);
                  }}
                >
                  Delete
                </Button>
                <Link to="/ClientManager/EditPayment">
                  <Button
                    variant="link"
                    onClick={() => {
                      editPayment(payment.ID);
                    }}
                  >
                    Edit
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DisplayPayments;
