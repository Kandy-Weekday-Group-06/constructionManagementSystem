import React, { useState,useEffect } from 'react';
import {Form ,Button,Container,Row,Col,Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "../../firebase";



function AddSubcontractor() {

   //get data from form and store 
   const [ comName , setComName ] = useState("");
   const [ type , setType ] = useState("");
   const [ email , setEmail ] = useState("");
   const [ phone , setPhone ] = useState("");
   const [ joinDate , setJoinDate ] = useState("");
   const [ types, setTypes ] = useState([]);
   const db = firebase.firestore();

   //bring types data to selection
   useEffect(() => {

    db.collection('types').onSnapshot(snapshot=>{
  
        const arr =snapshot.docs.map(doc =>doc.data());
        
        setTypes(arr);
        

      })
   
    }, [db])

    function sendData(e){
      e.preventDefault();
      alert("New Subcontractor Added");
      const newSubcontractor={
          comName,
          type,
          email,
          phone,
          joinDate,
      }
      console.log(newSubcontractor);

      


      db.collection("subcontractors").doc().set(newSubcontractor)
      .then(() => {
          console.log("Successfully Added !");
      })
      .catch((error) => {
          console.error("Error : ", error);
      });

        setComName("");
        setType("");
        setEmail("");
        setPhone("");
        setJoinDate("");
    };
    



    return (
     <div>  
    
      <div className="container">  
      <div className="container">  
      
       <br/>
       <br/>
         <hr/>
         <h3 style={{backgroundColor: '#ccdcff'}}><br/>Add New Subcontractor</h3>
         <hr/> 
       <br/>
       <br/>
       <Container>
        <Row>
          <Col>
          <div className = "addSubcontractorForm"  style={{color : 'black'}}>
            <Form className="subForm"  style={{backgroundColor: '#ccdcff'}}
            onSubmit={sendData}>
               <br/>
               <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Company Name" 
                  value={comName} onChange={(e) => {setComName(e.target.value);}} />
               </Form.Group>
 
        
               <Form.Control as="select" onChange={(e)=>{setType(e.target.value);}}>
                    <option value="">selectType</option>
                    {types.map(type=>(
                        <option value={type.typeName}>{type.typeName}</option>
                    ))}
                </Form.Control>
         

               <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Label>Email</Form.Label>
                   <Form.Control type="email" placeholder="abc@gmail.com" 
                    value={email} onChange={(e) => {setEmail(e.target.value);}}/>
               </Form.Group>

               <Form.Group className="mb-3" controlId="formBasicPhone">
                   <Form.Label>Phone Number</Form.Label>
                   <Form.Control type="phone" pattern="[0-9]{10}" size="10" 
                     value={phone} onChange={(e) => {setPhone(e.target.value);}}/>
               </Form.Group>

               <Form.Group className="mb-3" controlId="formBasicDate">
                  <Form.Label>Joining Date</Form.Label>
                  <Form.Control type="date" 
                    value={joinDate} onChange={(e) => {setJoinDate(e.target.value);}} />
               </Form.Group>
         
               <Button variant="primary" type="submit" style={{width: 300}}>
                  Submit
               </Button>
               <br/>
               <br/>
               
           </Form>
          </div> 
         </Col> 
         <Col>
            <div>
              <br/>
              <br/>
               <Image src="./assets/img/subcontract/4775.jpg" thumbnail style={{border:"none"}}/>
            </div>
         </Col>
       </Row>
      </Container>
     </div>
     </div>
     <br/>
     <br/>
     <br/>
     <br/>
    </div>
     
    )
}

export default AddSubcontractor;