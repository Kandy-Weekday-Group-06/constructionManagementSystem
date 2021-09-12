import { Form, Button, Container, Row, Col } from 'react-bootstrap'
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
                                let work_days=total;
                                let basic_salary=doc.data().basicSalary;
                                let amount= total*doc.data().basicSalary; 
                                console.log("amount",amount);
                                let ETF_amount=amount*5/100;
                                let employee_name=employee[i].data.employeeName;

                                const SalaryRecord = {
                                    year,
                                    month,
                                    employee_name,
                                    work_days,
                                    basic_salary,
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
            <Container style={{margin:"80px 50px 50px 150px",}}>            
                <Col style={{margin:"50px 50px 50px 100px",}}>
                    <Row>
                        <Col>
                            <Row style={{margin:"0px 10px 0px 10px"}}>
                                <Col md={{ span: 2, offset: 2 }}> <Form.Label  md={{ span: 2, offset: 5 }} className="text-warning" style={{fontSize:"18px"}}>Year</Form.Label> </Col>
                                <Col md={{ span: 2, offset: 0 }}> <Form.Control md={{ span: 2, offset: 0 }} onChange={(e)=>{setYear(e.target.value)}} type="text" placeholder="Enter year"/></Col>
                            </Row>   
                        </Col>

                    </Row><br/>
                    <Row>
                        <Col>
                            <Row style={{margin:"0px 10px 0px 10px"}}>
                                <Col md={{ span: 2, offset: 2 }}> <Form.Label md={{ span: 2, offset: 2 }} className="text-warning" style={{fontSize:"18px"}}>Month</Form.Label></Col>
                                <Col md={{ span: 2, offset: 0 }}> <Form.Control md={{ span: 2, offset: 0 }} onChange={(e)=>{setMonth(e.target.value)}} type="text" placeholder="Enter month"/></Col>
                            </Row>   
                        </Col>

                    </Row>
                </Col>       
            </Container>
            <Container style={{margin:"20px 50px 50px 150px",}}>

                <Row style={{margin:"20px 50px 50px 150px",}}>
                   
                        <Col>
                            <Row>
                                <Col md={{ span: 2, offset: 2 }}> <Button variant="outline-warning" onClick={CalculateSalary} type="submit">Calculate Salary</Button></Col>
                                <Col md={{ span: 4, offset: 0 }}>  <Link to='/adminPannel/EmployeeManager/salaryReport'><Button variant="outline-warning" onClick={()=>{SendDetails(year,month)}} type="submit">Generate Salary Report</Button></Link></Col>
                            </Row>   
                        </Col>
                   
                </Row>    
            
            </Container>

            
        </div>
    )
}

export default Employee 