import ClientManager from './component/ClientManager';
import Home from './component/Home/Home';
import Header from './component/Header/Header';
import AdminPannel from './component/AdminPannel/AdminPannel';
import AttendanceManager from './component/AttendanceManager/AttendanceManager';
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
          <Route path='/adminPannel/attendanceManager' component={AttendanceManager}>
            <AttendanceManager/>
          </Route>
          

        </Switch>
      
    
      </Router>
    
      
    </div>
  );
}

export default App;
