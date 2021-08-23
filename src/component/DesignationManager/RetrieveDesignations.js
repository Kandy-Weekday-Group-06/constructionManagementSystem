import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import firebase from "../../firebase";
import { func } from 'prop-types';
import { Table, Container } from 'react-bootstrap';
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
        alert("edit designation",id);
         editDesignation. EditDesignationHandler(id);
    }


    return (
        <div>
            <Container>
                <Table>
                    <thead>
                        <tr>
                        <td>Designation</td>
                        <td>Basic Salary</td>
                        <td>Description</td>
                        </tr>
                    </thead>
                    <tbody>
                        {designation.map((desig)=>(
                            <tr>
                                <td>{desig.data.designation}</td>
                                <td>{desig.data.basicSalary}</td>
                                <td>{desig.data.description}</td>
                                <button onClick={()=>{DeleteDesignation(desig.key)}}>Delete</button>
                                <Link to='/AdminPannel/DesignationManager/editDesignation'><button onClick={()=>{EditDesignation(desig.key)}}>Edit</button></Link> 
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>       
        </div>
    )
}

export default RetrieveDesignations
