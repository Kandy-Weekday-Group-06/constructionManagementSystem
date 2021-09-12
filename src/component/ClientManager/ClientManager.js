import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DisplayClients from "./DisplayClients";
import AddClient from "./AddClient";
import EditClient from "./EditClient";
import AddPayment from "./AddPayment";
import React, { useState } from "react";
import DisplayPayments from "./DisplayPayments";
import EditPayment from "./EditPayment";
import ViewClient from "./ViewClient";

function ClientManager() {
  const [editingClient, setEditingClient] = useState("");
  const [editingPayment, setEditingPayment] = useState("");
  const [viewingClient, setViewingClient] = useState("");

  function editClientHandler(CliID) {
    setEditingClient(CliID);
  }

  function editPaymentHandler(PayID) {
    setEditingPayment(PayID);
  }

  function viewClientHandler(CliName) {
    setViewingClient(CliName);
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route
            path="/adminPannel/ClientManager"
            exact
            component={(DisplayClients, DisplayPayments)}
          >
            <DisplayClients
              editClientHandler={editClientHandler}
              viewClientHandler={viewClientHandler}
            />
            <DisplayPayments editPaymentHandler={editPaymentHandler} />
          </Route>

          <Route path="/adminPannel/ClientManager/AddClient">
            <AddClient />
          </Route>

          <Route path="/adminPannel/ClientManager/EditClient">
            <EditClient id={editingClient} />
          </Route>

          <Route path="/adminPannel/ClientManager/ViewClient">
            <ViewClient name={viewingClient} />
          </Route>

          <Route path="/adminPannel/ClientManager/AddPayment">
            <AddPayment />
          </Route>

          <Route path="/adminPannel/ClientManager/EditPayment">
            <EditPayment id={editingPayment} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default ClientManager;
