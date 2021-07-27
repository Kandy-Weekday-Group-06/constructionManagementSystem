import React, { useEffect,useState } from 'react';
import firebase from "../../firebase";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const db = firebase.firestore();

function EditDesignation(props) {
    
    const [designationID, setDesignationID] = useState(props.id)
    const [designation,setDesignation]=useState("");
    const [basicSalary,setBasicSalary]=useState("");
    const [description,setDescription]=useState("");
    console.log("edit this id ",designationID);

    useEffect(()=>{
        db.collection("Designation").doc(designationID.toString()).get().then((docs)=>{
            if(docs.exists){
                setDesignation(docs.data().designation);
                setBasicSalary(docs.data().basicSalary);
                setDescription(docs.data().description);
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
            description
        }
        db.collection("Designation").doc(designationID).update(newDesignation);
        alert("designation updated");

        setDesignation("");
        setBasicSalary("");
        setDescription("");
    }

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control value={designation} onChange={(e)=>{setDesignation(e.target.value)}} type="email" placeholder="Enter the designation" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Basic Salary</Form.Label>
                    <Form.Control value={basicSalary} onChange={(e)=>{setBasicSalary(e.target.value)}} type="email" placeholder="Enter the designation" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={description} onChange={(e)=>{setDescription(e.target.value)}} as="textarea" rows={3} />
                </Form.Group>
                <Button onClick={UpdateDesignation} variant="primary" type="submit"> Update</Button>
            </Form>
        </div>
    )
}

export default EditDesignation
