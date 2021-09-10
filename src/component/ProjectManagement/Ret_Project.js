import React,{useState,useEffect} from "react";

import firebase,{query,where} from "../../firebase";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
import { Modal,Col,Container,Row,Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Ret_Project(props){

  let history=useHistory();
  const [updatePro, upOngoing] = useState(props);
  const [currentPro, setCurrent] = useState(props.currentid);


  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [address, setAdd] = useState("");

  const [clientDet, setClient] = useState("Luki");
  
  const [client, setClDet] = useState([]);

  
  const [startDate, setStart] = useState("");
  const [endDate, setEnd] = useState("");
  const [upPro, setProjectUp] = useState([]);//Ret of particular project

  const [loading, setLoading] = useState(false);

  const [updater, setUpdater] = useState(false);


  const [clientName, setClientName] = useState("Luki");

  //Pop ups
  const [lgShow, setLgShow] = useState(false);

  //DB connection

  const editdb = firebase.firestore().collection("Con_Project").doc(currentPro);
  const deldb = firebase.firestore().collection("Con_Project");
  const clidb = firebase.firestore();
  const db=firebase.firestore(firebase);

  //Retrieval of Single Project Details
  

  function deleteProject(currentPro){  //delete specific project
    alert(`Are you sure to delete the project ${title}`);
    

        const OldProject={
          title,
          budget,
          address,
          clientDet,
          startDate,
          endDate
        }
        db.collection("Fin_Project").add({
          Title: OldProject.title,
          Budget: OldProject.budget,
          Address:OldProject.address,
          Client:OldProject.clientDet,
          Start:OldProject.startDate,
          End:OldProject.endDate
        }).then((docRef) => {
          
          console.log("Document written with ID: ", docRef.id);

                  deldb.doc(currentPro).delete().then(() => {
                  console.log("Document successfully deleted! ");

                  alert(`Document Deleted Successfull ${currentPro}`);
                  window.location.replace("/adminPannel/ProjectManagement");
      
              
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    })
          
          }).catch((error) => {
          console.error("Error adding document: ", error);
  });
  }

      
   

  

  function UpOngoing(proid){
   updatePro.updateid(proid);
  }


  //Client Details
 function retClient (name){
  
   setClientName(name);
   
       clidb.collection("clients").where("clientName","==",clientName)
            .get()
            .then((querySnapshot) =>{

                querySnapshot.forEach((doc) => {
              
                    setClDet(doc.data());
                    console.log("Client documents: ",doc.data());
                    

                });
                loader();
               
        })
        .catch(async(error) => {
          console.log("Error getting documents: ", error);
        });
  }

useEffect(() => {
  
  editdb.get().then( snapshot => setProjectUp(snapshot.data()),
  
      setClient(upPro.Client),
      setID(currentPro),
      setTitle(upPro.Title),
      setBudget(upPro.Budget),
      setAdd(upPro.Address),
      
      setStart(upPro.Start),
      setEnd(upPro.End),

     // retClient(upPro.Client),
     
  );
  
 

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
                <Col>Start:<b> {startDate}</b>  End :<b>{endDate}</b></Col>
                <Col>
                  

                  <Row xs="auto">
                        <Col>
                            <Link to="/adminPannel/ProjectManagement/UpdatePro">
                                    <Button variant="primary" onClick={() => { UpOngoing(id); }}> Modify </Button>
                          </Link>
                        </Col>
                        <Col>
                            <Button variant="light" onClick={() => { retClient(clientDet); }}> ...</Button>
                        </Col>
                  </Row>
                      
                </Col>
              </Row>
              <br/><br/><br/><br/>
             
                  <Row>
                    <Col>Client Name: <b>{clientDet}</b></Col>
                    <Col>Client Tp:<b>{client.phone}</b> </Col>
                  </Row>
                  <br/><br/><br/><br/>
                  <Row>
                    <Col>Estimated Budget: <b>{budget}</b> </Col>
                    <Col>Project Address: <b>{address}</b></Col>
                    <Col>Current Paid Amount:<b></b> </Col>
                  </Row>
                  <br/><br/><br/><br/>
                  <Row>
                    <Col><Button onClick={() => setLgShow(true)}>Employee</Button>
                    <Modal
                      size="lg"
                      show={lgShow}
                      onHide={() => setLgShow(false)}
                      aria-labelledby="example-modal-sizes-title-lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                          Employee
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>...</Modal.Body>
                    </Modal>
                    
                    </Col>
                    
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
                    <Col md={{ span: 4, offset: 7 }} ><Button variant="danger"  onClick={() => deleteProject(currentPro)}>Close Project</Button></Col>
                  </Row>

        </Container>
      </div>
      
    );
}