import React,{useState,useEffect} from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { Table,Col,Container,Row,Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Ret_Project(props){
  const [currentPro, setCurrent] = useState(props.currentid);
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [address, setAdd] = useState("");
  const [clientDet, setClient] = useState("");
  const [startDate, setStart] = useState("");
  const [endDate, setEnd] = useState("");
  const [upPro, setProjectUp] = useState([]);//Ret of particular project

  const [loading, setLoading] = useState(false);

  //DB connection

  const editdb = firebase.firestore().collection("Con_Project").doc(currentPro);

  //Retrieval of Single Project Details
  function retProject(currenPro){
    
  

    editdb.get().then(snapshot => setProjectUp(snapshot.data()));
    setID(currentPro);
    setTitle(upPro.Title);
    setBudget(upPro.Budget);
    setAdd(upPro.Address);
    setClient(upPro.Client);
    setStart(upPro.Start);
    setEnd(upPro.End);
    

  }

useEffect(() => {

  retProject();

}, [editdb]);


function loader(){
if(loading==true){
  setLoading(false);
}
else{
  setLoading(true);
}}
  

    return(
      <div>
       
        

         


        <Container fluid="md">
        <br/><br/>
              <Row>
                <Col><h2>{title}</h2></Col>
                <Col>Start: {startDate}  End :{endDate}</Col>
                <Col>
                       <Link to="/ProjectManagement/UpProject">
                                <Button variant="primary"> Modify </Button>
                       </Link>
                </Col>
              </Row>
              <br/><br/><br/><br/>
             
                  <Row>
                    <Col>Client Name: {clientDet}</Col>
                    <Col>Client Tp: </Col>
                  </Row>
                  <br/><br/><br/><br/>
                  <Row>
                    <Col>Estimated Budget: {budget}</Col>
                    <Col>Project Address: {address}</Col>
                    <Col>Current Paid Amount: </Col>
                  </Row>
                  <br/><br/><br/><br/>
                  <Row>
                    <Col><h4>Working Employee</h4></Col>
                    
                  </Row>
                  <br/><br/><br/><br/>
                  <Row>
                    <Col><h4>Sub Contracts</h4></Col>
                    
                  </Row>
                  <br/><br/><br/><br/>
                  <Row>
                    <Col><h4>Supplies</h4></Col>
                    
                  </Row>
                  <br/><br/><br/><br/>
                  <Row>
                    <Col md={{ span: 4, offset: 4 }}><Button variant="success">Summary</Button></Col>
                    <Col md={{ span: 4, offset: 7 }} ><Button variant="danger">Close Project</Button></Col>
                  </Row>

        </Container>
      </div>
      
    );
}