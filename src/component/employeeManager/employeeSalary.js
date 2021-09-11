import { Form, Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import firebase from "../../firebase";
import FigureCaption from 'react-bootstrap/esm/FigureCaption';
import { Link } from 'react-router-dom';

const db = firebase.firestore();

function Employee(props) {
    
    const[details,setDetails]=useState(props);
    const [year,setYear] = useState("");
    const [month, setMonth]=useState("");
    const[employee,setEmployee]=useState([]);

    async function CalculateSalary(){

        //taking all the employee details to the 'employee' array
        db.collection("employees").onSnapshot((querySnapshot)=>{
            const array = querySnapshot.docs.map((doc)=>({
            
                    data : doc.data(),
                    key : doc.id,
            }));

            setEmployee(array);
            console.log("employee array>>>>>>>>",employee);

            //run the for loop for each employee
            for(let i=0;i<employee.length;i++){

                //filtering the number of worked days of the employee
                db.collection("attendance").where("employeeID","==",employee[i].key).where("year","==",year).where("month","==",month).where("dayStatus","==","worked").onSnapshot(async (querySnapshot)=>{
                    const array1=querySnapshot.docs.map((doc)=>({
                    
                            data : doc.data(),
                            key : doc.id
                    }));
                    
                    //taking the length of the 'array1'
                    let total=array1.length;
                    console.log("total of ",employee[i].key," is ",total);

                    
                    //filtering the basic salary of the designation of the employee
                    await db.collection("Designation").where("designation","==", employee[i].data.designation).onSnapshot((querySnapshot)=>{
                        const array2 = querySnapshot.docs.map((doc)=>{
                                
                                //key : doc.id
                                let amount= total*doc.data().basicSalary; 
                                console.log("amount",amount);
                                let ETF_amount=amount*5/100;
                                let employeeName=employee[i].data.employeeName;

                                const SalaryRecord = {
                                    year,
                                    month,
                                    employeeName,
                                    amount,
                                    ETF_amount,
                                    
                                }
        
                                //sending the record to the database
                                db.collection("Salary").add(SalaryRecord).then(()=>{
                                }).catch((err)=>{
                                    alert(err.message);
                                });
                                
                                return 0;
                                
                                });  
                        

                        //calculations of salary and ETF
                        

                        //if(array2[0].data.status=="permanent") only calculate the ETF
                        
                        //set all the required data to 'SalaryRecord' array before sending them to the database
                        /*const SalaryRecord = {
                            year,
                            month,
                            employeeName,
                            amount,
                            ETF_amount,
                            
                        }

                        //sending the record to the database
                        db.collection("Salary").add(SalaryRecord).then(()=>{
                        }).catch((err)=>{
                            alert(err.message);
                        });*/

                    }) 
    
                })    
            }
                
        });

        alert("Salary Calculated");

    } 
    
    function SendDetails(year,month){
        console.log("month", month);
        console.log("year" ,year);
        details.setDetailsMain(year,month);
    }
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Year</Form.Label>
                    <Form.Control onChange={(e)=>{setYear(e.target.value)}} type="text" placeholder="Enter year"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Month</Form.Label>
                    <Form.Control onChange={(e)=>{setMonth(e.target.value)}} type="text" placeholder="Enter month"/>
                </Form.Group>
            </Form>
            <Button onClick={CalculateSalary} variant="primary" type="submit">Calculate Salary</Button>
            <Link to='/adminPannel/EmployeeManager/salaryReport'><Button onClick={()=>{SendDetails(year,month)}} variant="primary" type="submit">Generate Salary Report</Button></Link>
        </div>
    )
}

export default Employee 