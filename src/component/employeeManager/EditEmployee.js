import { TextField, Form, makeStyles,Paper } from "@material-ui/core";
import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import firebase from "firebase";
import PageHeader from "./PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Button,Row,Col,Container } from "react-bootstrap";
import Button1 from '@material-ui/core/Button';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {

          display: 'flex',
          flexWrap: 'wrap',
          '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(40),
          height: theme.spacing(10),
          marginLeft : '190px',
        },

      },
    },
  }));

function EditEmployee(props) {

    const [employeeName, setEmployeeName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [designation, setDesignation] = useState("");
    const [startdate, setStartDate] = useState("");
    const [etf, setEtf] = useState("");
    const [empType, setEmpType] = useState("");

    const db = firebase.firestore();

    const [employeeID, setEmployeeId] = useState(props.id);

    const classes = useStyles();

    useEffect(() => {
        db.collection("employees")
          .doc(employeeID.toString())
          .get()
          .then(function (doc) {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              setEmployeeName(doc.data().employeeName);
              setAddress(doc.data().address);
              setPhoneNumber(doc.data().phoneNumber);
              setDesignation(doc.data().designation);
              setStartDate(doc.data().startdate);
              setEtf(doc.data().etf);
              setEmpType(doc.data().empType);
            } else {
              // doc.data() will be undefined in this case
              console.log("No such record!");
            }
          })
          .catch(function (error) {
            console.log("Error getting record:", error);
          });
      }, [db, employeeID]);
    
      function editdata(e) {
        e.preventDefault();
        alert("Edit done");
        const updatedEmployee = {
            employeeName,
            address,
            phoneNumber,
            designation,
            startdate,
            etf,
            empType,
        };
        console.log(updatedEmployee);
    
        db.collection("employees").doc(employeeID).update(updatedEmployee);
      }

    return (

    <>
    <PageHeader
        title="Edit Employee"
        //subTitle="Form design with validation"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
    />
    <div>
      <Paper  elevation={3} className = {classes.pageContent}>
        <form onSubmit={editdata} className ={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        
                        label ="Full Name"
                        name = "employeeName"
                        type="text"
                        pattern="^[A-Za-z \s*]+$"
                        required
                        value={employeeName}
                        onChange={(e) => {
                          setEmployeeName(e.target.value);
                        }}
                    />

                    <TextField
                        
                        label ="Address"
                        name = "address"
                        type="text"
                        pattern="^[A-Za-z \s*]+$"
                        required
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                    />

                    
                    <TextField
                        
                        label ="Phone"
                        name = "phoneNumber"
                        type="text"
                        pattern="[0-9]{10}"
                        required
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                    />


                    <TextField
                        
                        label ="ETF Amount"
                        name = "etf"
                        type="text"
                        pattern="^[A-Za-z \s*]+$"
                        value={etf}
                        onChange={(e) => {
                        setEtf(e.target.value);
                        }}
                    />

                </Grid>
                <Grid item xs={6}>

                <TextField
                        
                        label ="Designation"
                        name = "designation"
                        type="text"
                        //pattern="^[A-Za-z \s*]+$"
                        value={designation}
                        onChange={(e) => {
                          setDesignation(e.target.value);
                        }}
                />

                  <TextField
                        
                        label ="Type"
                        name = "empType"
                        type="text"
                        //pattern="^[A-Za-z \s*]+$"
                        required
                        value={empType}
                        onChange={(e) => {
                        setEmpType(e.target.value);
                        }}
                    />

                    <TextField
                        
                        //label ="Start Date"
                        name = "startdate"
                        type="date"
                        required
                        disabled
                        //pattern="^[A-Za-z \s*]+$"
                        value={startdate}
                        onChange={(e) => {
                        setStartDate(e.target.value);
                        }}
                    />

                  <Link to ='/adminPannel/EmployeeManager/DisplayEmployee'>
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
                      
                    >
                        submit
                    </Button>
                  </Link>


                </Grid>
            </Grid>
        </form>
        </Paper>
    </div>
    </>

    );
}

export default EditEmployee;
