import React,{useEffect, useState} from 'react';
import {Row,Form,Col,Button} from 'react-bootstrap';
import './editAttendance.css';
import firebase from "../../firebase";

function EditAttendance(props) {

    const db = firebase.firestore();
    const [arriveAt, setArriveAt] = useState("");
    const [leftAt, setleftAt] = useState("");
    const [date, setDate] = useState(props.editingAttendanceDate);
    const [employeeName, setEmployeeName] = useState("");
    const [position, setPosition] = useState("");
    const [employeeID, setEmployeeID] = useState(props.employeeID);
    const [dayType, setDaytype] = useState("");
    const [attendanceDocID, setAttendanceDocID] = useState("");
    const [ProjectTitles, SetProjectTitles] = useState([]);
    const [ProjectTitle, SetProjectTitle] = useState("");
    const [month, setMonth] = useState("2021-08");
    const [year, setYear] = useState("2021");
    
    
    //7zdlrB1jfaWyXJrpjkW0

    useEffect(() => {
        db.collection("employees")
        .doc(employeeID)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            setEmployeeName(doc.data().employeeName);
            setPosition(doc.data().position);
            
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });

        //-----------------------------------------------------------------------------

        db.collection("attendance")
        .where('employeeID', '==', employeeID).where('date','==',date).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                setDaytype(doc.data().dayStatus);
                setArriveAt(doc.data().arriveAt);
                setleftAt(doc.data().leftAt);
                SetProjectTitle(doc.data().ProjectTitle);
                setAttendanceDocID(doc.id);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        
        //-----------project titles--------------------------
        db.collection("Con_Project").onSnapshot((snapshot) => {
            const arr = snapshot.docs.map((doc) => (doc.data().Title));
      
            
            SetProjectTitles(arr);
        });

    }, [db,date]);

    function editdata(e){
        e.preventDefault();
        alert("editdone");
        const updatedAttendance ={
            arriveAt,
            "dayStatus":dayType,
            leftAt,
            month,
            year,
            ProjectTitle

        }
        console.log(updatedAttendance);

        db.collection("attendance").doc(attendanceDocID).update(updatedAttendance);
    }
   

    return (
        <div>
            <Row className="justify-content-center mt-5 border">
                <h1 className="text-center text-warning">Edit attendace</h1>
            </Row>
            <Row className="justify-content-center mt-3">
                <h6 className="text-center">EmployeeID: {employeeID}  </h6>
                
            </Row>
            <Row className="justify-content-center mt-3">
                <h6 className="text-center">Name: {employeeName} </h6>
            </Row>
            <Row className="justify-content-center mt-3">
                <h6 className="text-center">Position: {position}</h6>
            </Row>
            <Row className="justify-content-center border ">
                <Form className="w-75 justify-content-center mb-5"  onSubmit={editdata}>
                    
                    <Row className="justify-content-center mt-3">
                        <Col xs lg="1" className="editAttendance__align-me-v-center"><h6 className="text-center" >Date : </h6></Col>
                        <Col xs lg="3"><Form.Control type="date" value={date} onChange={(e)=>{setDate(e.target.value);}} /></Col>
                         
                    </Row>    
                    <Row className="justify-content-center mt-5 w-100">
                        <Col xs lg="3">
                            <Form.Group className="mb-1" controlId="formBasicEmail">
                                <Form.Label>Arrive At</Form.Label>
                                <Form.Control type="time"  value={arriveAt} onChange={(e)=>{setArriveAt(e.target.value);}}/>
                                
                            </Form.Group>
                        </Col>
                        <Col xs lg="3">
                            <Form.Group className="mb-1" controlId="formBasicEmail">
                                <Form.Label>Left At</Form.Label>
                                <Form.Control type="time"  value={leftAt} onChange={(e)=>{setleftAt(e.target.value);}}/>
                                
                                
                            </Form.Group>
                            
                            <br />
                        
                        </Col>
                    
                    </Row> 
                    <Row className="justify-content-center mt-1 w-100">
                        <Col xs lg="3">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Day type</Form.Label>
                                <Form.Control as="select" value={dayType} onChange={(e)=>{setDaytype(e.target.value);}}>
                                    
                                    <option value="initialized">Initialized</option>
                                    <option value="woked">Worked</option>
                                    <option value="onLeave">On Leave</option>
                                    <option value="onHalfDay">On Half Day</option>
                                    <option value="holliday">HolliDay</option>
                                    
                                </Form.Control>
                            </Form.Group>    
                        </Col>
                        <Col xs lg="3">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Day type</Form.Label>
                                <Form.Control as="select" value={ProjectTitle} onChange={(e)=>{SetProjectTitle(e.target.value);}}>
                                    <option value="">select a project Title</option>
                                    {ProjectTitles.map(Title=>(
                                        <option value={Title}>{Title}</option>
                                    ))}
                                    
                                    
                                </Form.Control>
                            </Form.Group>    
                        </Col>
                        
                    
                    </Row> 
                    <Row className="justify-content-center mt-1 w-100">
                        <Col xs lg="3" className=" d-flex justify-content-center">
                            <Button variant="primary" type="submit" className="">
                                Submit
                            </Button>
                        </Col>
                        
                    
                    </Row>   
                     
                </Form>
            </Row>
        </div>
    )
}

export default EditAttendance
