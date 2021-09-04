import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewClient(props) {
  const [clientName, setClientName] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [payments, setPayments] = useState([]);
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

  useEffect(() => {
    async function fetchData() {
      const paymentsRef = db.collection("payments");
      const snapshot = await paymentsRef
        .where("clientId", "==", clientId)
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
  }, [db, clientId]);

  return (
    <div className="container">
      <br />
      <h4>Client ID: {clientId}</h4>
      <br />
      <h4>Client Name: {clientName}</h4>
      <br />
      <h4>Representative Name: {representativeName}</h4>
      <br />
      <h4>Client/ Representative Phone Number: {phone}</h4>
      <br />
      <h4>Client/ Representative Email: {email}</h4>
      <br />
      <h4>Client Address: {address}</h4>
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
