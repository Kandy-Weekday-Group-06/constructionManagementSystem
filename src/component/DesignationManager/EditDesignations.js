import React, { useEffect,useState } from 'react';
import firebase from "../../firebase";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Image, Card,} from 'react-bootstrap';
import img1 from "./images/57279.jpg";
import { Link } from 'react-router-dom';

const db = firebase.firestore();

function EditDesignation(props) {
    
    const [designationID, setDesignationID] = useState(props.id)
    const [designation,setDesignation]=useState("");
    const [basicSalary,setBasicSalary]=useState("");
    const [status,setStatus]=useState("");
    console.log("edit this id ",designationID);

    useEffect(()=>{
        db.collection("Designation").doc(designationID.toString()).get().then((docs)=>{
            if(docs.exists){
                setDesignation(docs.data().designation);
                setBasicSalary(docs.data().basicSalary);
                setStatus(docs.data().status);
            }else{
                alert("No such document available");
            }
        }).catch((err)=>{
            console.error(err);
        })
    },[db,designationID])

    function UpdateDesignation(e){
        e.preventDefault();

        const newDesignation = {
            designation,
            basicSalary,
            status
        }
        db.collection("Designation").doc(designationID).update(newDesignation);
        alert("designation updated");

        setDesignation("");
        setBasicSalary("");
        setStatus("");
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Form style={{margin:"80px 50px 50px 100px",}}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label style={{color:"#212121",fontWeight:"5px",}}>Designation</Form.Label>
                                <Form.Control value={designation} onChange={(e)=>{setDesignation(e.target.value)}} type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label style={{color:"#212121",fontWeight:"5px",}}>Basic Salary</Form.Label>
                                <Form.Control value={basicSalary} onChange={(e)=>{setBasicSalary(e.target.value)}} type="text"  />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label style={{color:"#212121",fontWeight:"5px",}}>Status</Form.Label>
                                <Form.Control as="select" value={status} onChange={(e)=>{setStatus(e.target.value)}}>
                                    <option>contracted</option>
                                    <option>non-contracted</option>
                                </Form.Control>
                            </Form.Group>
                            <br/>
                            
                            <Link to='/AdminPannel/DesignationManager'>
                                <Button style={{color:"#ffffff",backgroundColor:"#f0ad4e"}} onClick={UpdateDesignation} variant="primary" type="submit"> Update</Button>
                            </Link>
                           
                        </Form>
                    </Col>
                    <Col >
                        <img style={{margin:"80px 50px 50px 100px", width:"80%", height:"80%",}}
                            src={img1}
                            alt="mysvg"
                        ></img>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default EditDesignation