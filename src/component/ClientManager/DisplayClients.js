import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function DisplayClients(props) {
  const [clients, setClients] = useState([]);
  const db = firebase.firestore();
  const [editingClient, setEditingClient] = useState(props);
  const [viewingClient, setViewingClient] = useState(props);

  useEffect(() => {
    db.collection("clients").onSnapshot((snapshot) => {
      const arr = snapshot.docs.map((doc) => ({
        ID: doc.id,
        data: doc.data(),
      }));

      setClients(arr);
    });
  }, [db]);

  function deleteClient(ID) {
    db.collection("clients")
      .doc(ID)
      .delete()
      .then(() => {
        alert(ID, "Document successfully deleted!");
      })
      .catch((err) => {
        console.error("Error removing document: ", err);
      });
  }

  function editClient(id) {
    alert("edit cli", id);
    editingClient.editClientHandler(id);
  }

  function viewClient(id) {
    //alert("view cli", id);
    viewingClient.viewClientHandler(id);
  }

  return (
    <div>
      <Link to="/ClientManager/AddClient">
        <Button variant="link">Add New Client</Button>
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ display: "none" }}>Document ID</th>
            <th>Individual's Full Name/ Organization's Name</th>
            <th>Representative's Full Name</th>
            <th>Individual's/ Representative's Contact Number</th>
            <th>Individual's/ Representative's Email Address</th>
            <th>Individual's/ Organization's Physical Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr>
              <td style={{ display: "none" }}>{client.ID}</td>
              <td>{client.data.clientName}</td>
              <td>{client.data.representativeName}</td>
              <td>{client.data.phone}</td>
              <td>{client.data.email}</td>
              <td>{client.data.address}</td>
              <td>
                <Button
                  variant="link"
                  onClick={() => {
                    deleteClient(client.ID);
                  }}
                >
                  Delete
                </Button>
                <Link to="/ClientManager/EditClient">
                  <Button
                    variant="link"
                    onClick={() => {
                      editClient(client.ID);
                    }}
                  >
                    Edit
                  </Button>
                </Link>
                <Link to="/ClientManager/ViewClient">
                  <Button
                    variant="link"
                    onClick={() => {
                      viewClient(client.ID);
                    }}
                  >
                    Generate Payment Report
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

export default DisplayClients;
