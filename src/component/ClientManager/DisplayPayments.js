import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { Table, Button, ButtonGroup } from "react-bootstrap";
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
      <Link to="/adminPannel/ClientManager/AddPayment">
        <Button style={{ borderRadius: "10px 10px 0 0" }} variant="primary">
          Add New Payment
        </Button>
      </Link>

      <Table bordered size="sm">
        <thead>
          <tr>
            <th style={{ display: "none" }}>Document ID</th>
            <th style={{ textAlign: "center" }}>Client Name</th>
            <th style={{ textAlign: "center" }}>Project Name</th>
            <th style={{ textAlign: "center" }}>Date</th>
            <th style={{ textAlign: "center" }}>Amount</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr>
              <td style={{ display: "none" }}>{payment.ID}</td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {payment.data.clientName}
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {payment.data.projectName}
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {payment.data.date}
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {payment.data.amount}
              </td>
              <td style={{ textAlign: "center" }}>
                <ButtonGroup>
                  <Link to="/adminPannel/ClientManager/EditPayment">
                    <Button
                      style={{ borderRadius: "5px 0 0 5px" }}
                      variant="warning"
                      onClick={() => {
                        editPayment(payment.ID);
                      }}
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    style={{ borderRadius: "0 5px 5px 0" }}
                    variant="danger"
                    onClick={() => {
                      deletePayment(payment.ID);
                    }}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DisplayPayments;
