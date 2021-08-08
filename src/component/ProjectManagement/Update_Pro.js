import React,{useState,useEffect} from "react";
import firebase from "../../firebase";
import { Form, Button,Row,Col,Container,Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UpProject(){
  //Declaration of Variables
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
        <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Project Title</th>
                <th>Budget</th>
                <th>Address</th>
                <th>Client Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                     {project.map(pro=>(
                         <tr>
                         <td>{pro.id}</td>
                         <td>{pro.data.Title}</td>
                         <td>{pro.data.Budget}</td>
                         <td>{pro.data.Address}</td>
                         <td>{pro.data.Client}</td>
                         <td>{pro.data.Start}</td>
                         <td>{pro.data.End}</td>
                         <td><button onClick={() =>retProject(pro.id)} class="btn btn-outline-danger">Edit</button></td>

                       </tr>
                      ))}
              
            </tbody>
        </Table>
        <br/><br/>


      <Container fluid="sm" >
      <Row>
        <Col md={{ span: 5, offset: 3 }}>
            <br/>
            <br/>
              <Form onSubmit={editProject}>
              <Form.Group  controlId="formGridState" align="center" >
                  <Form.Label size="lg" >New Project</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Project Title</Form.Label>
                    <Form.Control type="text" placeholder="Project_Restraunt01" value={title} onChange={e => setTitle(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBudget">
                  <Form.Label>Project Budget</Form.Label>
                    <Form.Control type="number" placeholder="Rs12500000" value={budget} onChange={e => setBudget(e.target.value)}/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Project Address</Form.Label>
                  <Form.Control as="textarea" rows={3} value={address} onChange={e => setAdd(e.target.value)}/>
                </Form.Group>
                

                <Form.Group className="mb-3">
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control value={clientDet} disabled />
                </Form.Group>
                
                  <Form.Select aria-label="Default select example" size="xxl" value={clientDet} onChange={e => setClient(e.target.value)}>
                      <option>Select Client</option>
                      {client.map(clients=>(
                          <option>{clients.data.clientName}</option>
                      ))}
                 </Form.Select>
              

                
          
                <br/>
                   <br/>


                <Form.Group  controlId="formGridState">
                  <Form.Label>Project Duration</Form.Label>
                </Form.Group>
                <Row>
                  <Col>

                  

                      <Form.Group className="mb-3" controlId="formBasicDate">
                        <Form.Label>Start Date</Form.Label>
                          <Form.Control type="date" placeholder="Project_Restraunt" value={startDate} onChange={e => setStart(e.target.value)}/>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control value={startDate} disabled />
                      </Form.Group>

                  </Col>
                  <Col>

                 

                      <Form.Group className="mb-3" controlId="formBasicDate">
                        <Form.Label>End Date</Form.Label>
                          <Form.Control type="date" placeholder="Project_Restraunt" value={endDate} onChange={e => setEnd(e.target.value)}/>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control value={endDate} disabled />
                    </Form.Group>
                  </Col>


                </Row>
                

                
                    <Button variant="primary" type="submit">
                            Confirm Update
                      </Button>
              </Form>
        </Col>
      </Row>
    </Container>
    </div>
      
    );
}