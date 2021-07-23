import ClientManager from './component/ClientManager';
import SubcontractManager from './component/SubcontractManager';
import Home from './component/Home/Home';
import Header from './component/Header/Header';
import AdminPannel from './component/AdminPannel/AdminPannel';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <div className="App">
      
      
     
      <Router>
        <Route path='/adminPannel' component={Header}/>
           

        <Switch>
          <Route path='/' exact component={Home} >
            <Home/>
          </Route>
          <Route path='/adminPannel' exact component={AdminPannel} >
            <AdminPannel/>
          </Route>
          <Route path='/ClientManager' exact component={ClientManager}>
            <ClientManager/>
          </Route>
          <Route path='/SubcontractManager' exact component={SubcontractManager}>
            <SubcontractManager/>
          </Route>
          

        </Switch>
      
    
      </Router>
    
      
    </div>
  );
}

export default App;
