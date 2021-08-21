import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function DisplayPayments(props) {
  const [payments, setPayments] = useState([]);
  const db = firebase.firestore();
  const [editingPayment, seteditingPayment] = useState(props);

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
            <th>Document ID</th>
            <th>ClientId</th>
            <th>ProjectId</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr>
              <td>{payment.ID}</td>
              <td>{payment.data.clientId}</td>
              <td>{payment.data.projectId}</td>
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
