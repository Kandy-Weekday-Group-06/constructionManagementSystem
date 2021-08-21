import React,{useState,useEffect} from "react";
import firebase from "../../firebase";
import { Card, Button,Row,Col,Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import date from "diff-dates"; 
import dateformat from "dateformat";
import "bootstrap/dist/css/bootstrap.min.css";

export default function OngoingProject(props){
  //Declaration of Variables
  const [onproject, setOngoing] = useState(props);
  const [project, setProject] = useState([]);
  const [upPro, setProjectUp] = useState([]);//Ret of particular data
  const [client, setClientName] = useState([]);//Client details ret
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [address, setAdd] = useState("");
  const [clientDet, setClient] = useState("");
  const [startDate, setStart] = useState(""); 
  const [endDate, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const unit="days";

  //Database connection

  const db1 = firebase.firestore().collection("Con_Project");
  const db2 = firebase.firestore().collection("clients");

//Retrieval of Client Function
  function RetClient(e){

   
    db2.get().then((item) => {
      const items = item.docs.map((doc) => ({
        id:doc.id,
        data:doc.data()
      }));
      setClientName(items);
  
    });
   
  }
  

//Retrieval of Project Details

function RetData(e){

   
  db1.get().then((item) => {
    const items = item.docs.map((doc) => ({
      id:doc.id,
      data:doc.data()
    }));
    setProject(items);

  });
 
}


//Retrieval of Single Project Details
function retProject(pro){
  const editdb = firebase.firestore().collection("Con_Project").doc(pro);

  editdb.get().then(snapshot => setProjectUp(snapshot.data()));
  setID(pro);
  setTitle(upPro.Title);
  setBudget(upPro.Budget);
  setAdd(upPro.Address);
  setClient(upPro.Client);
  setStart(upPro.Start);
  setEnd(upPro.End);
  RetClient();



}

//Edit Data

function editProject(e) {
  e.preventDefault();

  const editProject={
    title,
    budget,
    address,
    clientDet,
    startDate,
    endDate
  }
 
  db1.doc(id).update({
    Title: editProject.title,
    Budget: editProject.budget,
    Address:editProject.address,
    Client:editProject.clientDet,
    Start:editProject.startDate,
    End:editProject.endDate
  }).then(() => {
    alert("Data updated Succesfully: ");
    loader();
  })
    .catch((err) => {
      console.error(err);
    });
}
//Date Difference
function getDays(date1, date2) {
   
    return date(dateformat(date1,"isoDate"), dateformat(date2,"isoDate"),unit);
  }
  
function RetOngoing(id) {
  onproject.CurrentProject(id);

  }

  useEffect(() => {
    RetData();
    RetClient();
   
  }, [loading]);

  
function loader(){
  if(loading==true){
    setLoading(false);
  }
  else{
    setLoading(true);
  }
  
}

  

    return(
      <div>
          <Container fluid="sm">
                <Row>
                    <Col md={{ span: 9, offset: 2 }}>
                    {project.map(pro=>(
                        <Card>
                            <Card.Header as="h5">{pro.data.Title}</Card.Header>
                            <Card.Body>
                                <Card.Title>Client Name: {pro.data.Client}</Card.Title>
                                <Card.Text>
                                        <Row>
                                            <Col md={{ span: 9, offset: 2 }}> Project Address: {pro.data.Address}</Col>
                                            <Col md={{ span: 4, offset: 9 }}> Duration: {getDays(pro.data.End,pro.data.Start)} Days</Col>
                                        </Row>
                                </Card.Text>
                                <Row>
                                    <Col md={{ span: 4, offset: 8 }}> <Link to="/ProjectManagement/RetProject">
                                                                         <Button variant="warning" onClick={() => { RetOngoing(pro.id); }} > More info </Button>
                                                                        </Link>
                                      </Col>
                                </Row>
                               
                            </Card.Body>
                         </Card>
                         
                      ))}
                    
                    
                    </Col>
                </Row>
          </Container>
          
       
     </div>

      );
}