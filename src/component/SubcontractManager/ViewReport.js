import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewReport(props) {
  
  const [type, setType] = useState([]);
  const [payments, setPayments] = useState([]);
  const db = firebase.firestore();
  const [comName, setComName] = useState(props.name);

  useEffect(() => {
    db.collection("subcontractors")
      .where("comName", "==", comName)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          //setClientName(doc.data().clientName);
           setType(doc.data().type);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [db, comName]);

  useEffect(() => {
    async function fetchData() {
      const paymentsRef = db.collection("Subcontracts");
      const snapshot = await paymentsRef
        .where("comName", "==", comName)
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
  }, [db, comName]);

  return (
    <div className="container">
      <br />
      <h4>{comName} : {type}</h4>
      <br />
      <Table striped bordered hover>
        <thead>
           <tr style={{backgroundColor: '#ffb84d'}}> 
             <th>Project</th>    
             <th>Paid Amount</th>
                   
           </tr>
        </thead>
        <tbody>
            {payments.map((payment) => (
              <tr>
                  <td>{payment.data.Title}</td> 
                  <td>{payment.data.Paid_amount}</td> 
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ViewReport;
