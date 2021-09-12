import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewClient(props) {
  const [payments, setPayments] = useState([]);
  const [clients, setClients] = useState([]);
  const db = firebase.firestore();
  const [clientName] = useState(props.name);

  useEffect(() => {
    async function fetchClients() {
      const clientsRef = db.collection("clients");
      const snapshot = await clientsRef
        .where("clientName", "==", clientName)
        .get();
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        const arr = snapshot.docs.map((doc) => ({
          ID: doc.id,
          data: doc.data(),
        }));

        setClients(arr);
      });
    }
    fetchClients();
  }, [db, clientName]);

  useEffect(() => {
    async function fetchData() {
      const paymentsRef = db.collection("payments");
      const snapshot = await paymentsRef
        .where("clientName", "==", clientName)
        .get();
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        const arr = snapshot.docs.map((doc) => ({
          ID: doc.id,
          data: doc.data(),
        }));

        setPayments(arr);
      });
    }
    fetchData();
  }, [db, clientName]);

  return (
    <div className="container">
      <br />
      <h4>Client Name: {clientName}</h4>
      <br />
      {clients.map((client) => (
        <div>
          <h4>Representative Name: {client.data.representativeName}</h4>
          <br />
          <h4>Client/ Representative Phone Number: {client.data.phone}</h4>
          <br />
          <h4>Client/ Representative Email: {client.data.email}</h4>
          <br />
          <h4>Client Address: {client.data.address}</h4>
        </div>
      ))}
      <br />
      <h4>Client Payments: </h4>
      {payments.map((payment) => (
        <ul>
          <li>Date: {payment.data.date}</li>
          <li>Amount: {payment.data.amount}</li>
        </ul>
      ))}
    </div>
  );
}

export default ViewClient;
