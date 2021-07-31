import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DisplayClients from "./ClientManager/DisplayClients";
import AddClient from "./ClientManager/AddClient";
import EditClient from "./ClientManager/EditClient";
import AddPayment from "./ClientManager/AddPayment";
import React, { useState } from "react";
import DisplayPayments from "./ClientManager/DisplayPayments";
import EditPayment from "./ClientManager/EditPayment";

function ClientManager() {
  const [editingClient, setEditingClient] = useState("");
  const [editingPayment, setEditingPayment] = useState("");

  function editClientHandler(CliID) {
    console.log("CliID in clientmanager.js>>>>>>>>>", CliID);
    setEditingClient(CliID);
  }
  console.log("OUTER CliID in clientmanager.js>>>>>>>>>", editingClient);

  function editPaymentHandler(PayID) {
    console.log("PayID in clientmanager.js>>>>>>>>>", PayID);
    setEditingPayment(PayID);
  }
  console.log("OUTER PayID in clientmanager.js>>>>>>>>>", editingPayment);

  return (
    <div>
      <Router>
        <Switch>
          <Route
            path="/ClientManager"
            exact
            component={(DisplayClients, DisplayPayments)}
          >
            <DisplayClients editClientHandler={editClientHandler} />
            <DisplayPayments editPaymentHandler={editPaymentHandler} />
          </Route>

          <Route path="/ClientManager/AddClient">
            <AddClient />
          </Route>

          <Route path="/ClientManager/EditClient">
            <EditClient id={editingClient} />
          </Route>

          <Route path="/ClientManager/AddPayment">
            <AddPayment />
          </Route>

          <Route path="/ClientManager/EditPayment">
            <EditPayment id={editingPayment} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default ClientManager;
