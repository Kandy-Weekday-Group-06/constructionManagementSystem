import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import firebase from "../../firebase";
import { func } from 'prop-types';
import { Table, Container, Button } from 'react-bootstrap';
import { Route, Switch, NavLink, Link} from 'react-router-dom';

const db = firebase.firestore();

function RetrieveDesignations(props) {
   
    const [designation,setDesignation] = useState([]);
    const [editDesignation, setEditingDesignation]=useState(props);

    useEffect(()=>{
        
        
        db.collection("Designation").onSnapshot((querySnapshot)=>{
            const array = querySnapshot.docs.map((doc)=>({
            
                    data : doc.data(),
                    key : doc.id,
                }));

                setDesignation(array);
            })
        },[]);
        console.log("desig array>>>>>>>>",designation);


    function DeleteDesignation(key){
        db.collection('Designation').doc(key).delete().then(()=>{
            alert("record deleted");
        }).catch((err)=>{
            console.error(err);
        })
    }

    function EditDesignation(id){
        console.log("edit function in retriveDesignation.js >>", id);
         editDesignation. EditDesignationHandler(id);
    }


    return (
        <div>
            <Container style={{margin:"50px 100px 20px 620px",}}>
                <h2 style={{color:"#f0ad4e", fontWeight:"18px"}}>Employee Designations</h2>
            </Container>
            <Container class="container" style={{margin : "100px 100px 100px 220px",border:"5px",}} >
                <Table align='center' style={{border:"5px",}}>
                    <thead style={{backgroundColor:"#616161",fontSize:"18px",fontStyle:"", fontWeight:"5px"}}>
                        <tr>
                        <td style={{color:"white"}}>Designation</td>
                        <td style={{color:"white"}}>Basic Salary</td>
                        <td style={{color:"white"}}>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {designation.map((desig)=>(
                            <tr>
                                <td>{desig.data.designation}</td>
                                <td>{desig.data.basicSalary}</td>
                                <td>{desig.data.status}</td>
                                <Button style={{backgroundColor:"#f0ad4e",color:"#ffffff", margin:"4px 2px 4px 20px"}} onClick={()=>{DeleteDesignation(desig.key)}} class="btn">Delete</Button>
                                <Link to='/AdminPannel/DesignationManager/editDesignation'><Button style={{backgroundColor:"#f0ad4e",color:"#ffffff", margin:"4px 10px 4px 2px"}} onClick={()=>{EditDesignation(desig.key)}}>Edit </Button></Link> 
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <br/>

                <Link to='/AdminPannel/DesignationManager/addDesignation'><Button style={{color:"#ffffff",backgroundColor:"#f0ad4e"}}>Add Designation</Button></Link>
            </Container>       
        </div>
    )
}

export default RetrieveDesignations