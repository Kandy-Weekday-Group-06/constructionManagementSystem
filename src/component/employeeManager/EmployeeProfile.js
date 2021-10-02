import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import PageHeader from "./PageHeader";
import { Button,Row,Col,Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function EmployeeProfile(props) {

    const [employeeName, setEmployeeName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [designation, setDesignation] = useState("");
    const [startdate, setStartDate] = useState("");
    const [etf, setEtf] = useState("");
    const [empType, setEmpType] = useState("");
    const [sendEmpid,setsendEmpid] =useState(props);
    const [EmployeeID,setEmployeeID] = useState("")


    const db = firebase.firestore();
    const [empName, setEmployeeNames] = useState(props.name);

    useEffect(() => {
      console.log("Document data:", empName);
      db.collection("employees").where("employeeName","==",empName)
      .get()
      .then((querySnapshot) =>{

          querySnapshot.forEach((doc) => {
        
              
              console.log("Employee documents: ",doc.data());
              setEmployeeName(doc.data().employeeName);
              setAddress(doc.data().address);
              setPhoneNumber(doc.data().phoneNumber);
              setDesignation(doc.data().designation);
              setStartDate(doc.data().startdate);
              setEtf(doc.data().etf);
              setEmpType(doc.data().empType);
              setEmployeeID(doc.id);
              

          });
         
  })
  .catch(async(error) => {
    console.log("Error getting documents: ", error);
  });
}, [db, employeeName]);

function employeeattendanceClicked(ID){
  sendEmpid.editEmployeeHandler(ID);
}
    
    return (

      <>
      <PageHeader
      title={employeeName}
      //subTitle="Form design with validation"
      icon={<SpeakerNotesIcon fontSize="large" />}
      />


      <div >
      <br />
      <Container
            styles = {{
              margin : "0px 0px 0px 100px",
            }}>
              <h5>EmployeeID:{EmployeeID}</h5><br/>
      <h5>Address : {address}</h5>
      <br />
      <h5>Phone Number : {phoneNumber}</h5>
      <br />
      <h5>Designation : {designation}</h5>
      <br />
      <h5>Start Date : {startdate}</h5>
      <br />
      <h5>ETF Amount : {etf}</h5>
      <br />
      <h5>Type : {empType}</h5>
      <br />
      </Container>

      <Link to ='/adminPannel/EmployeeManager/MonthlyReport'>
                    <Button  type="submit"
                      styles={{
                        borderRadius: 15,
                        /*padding: "10px 20px",*/
                        backgroundColor: "#424242",
                        width: "200px",
                        margin : "0px 0px 30px 300px",
                        color : "#ffffff",
                        }}
                        variant="warning"
                        onClick={employeeattendanceClicked(EmployeeID)}
                      
                    >
                        View Attendance
                    </Button>
                  </Link>

                        <br/><br/>
    </div>

    </>
    );
}

export default EmployeeProfile;
