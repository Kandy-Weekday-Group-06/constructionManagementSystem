import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DisplayClients from "./ClientManager/DisplayClients";
import AddClient from "./ClientManager/AddClient";
import EditClient from "./ClientManager/EditClient";
import React, { useState } from "react";

function ClientManager() {
  const [editingClient, setEditingClient] = useState("");

  function editClientHandler(CliID) {
    console.log("CliID in clientmanager.js>>>>>>>>>", CliID);
    setEditingClient(CliID);
  }
  console.log("OUTER CliID in clientmanager.js>>>>>>>>>", editingClient);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/ClientManager/addClient">
            <AddClient />
          </Route>
          <Route path="/ClientManager" exact component={DisplayClients}>
            <DisplayClients editClientHandler={editClientHandler} />
          </Route>
          <Route path="/ClientManager/editClient">
            <EditClient id={editingClient} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default ClientManager;
