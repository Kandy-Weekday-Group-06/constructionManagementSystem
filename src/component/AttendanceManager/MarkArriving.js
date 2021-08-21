import React,{useState, useEffect} from 'react';
import { Form,Row,Col,Button} from 'react-bootstrap';
import {  Link } from "react-router-dom";
import './MarkArriving.css';
import { Search } from 'react-bootstrap-icons';
import firebase from "../../firebase";


function MarkArriving(props) {
    const db = firebase.firestore();
    const [arrivingTime, setArrivingTime] = useState("");
    const [arrivingDate, setArrivingDate] = useState("");
    const [employees, setEmployees] = useState([]);
    const [editingAttendance, setEditingAttendance] = useState(props);
    const [ProjectTitles, SetProjectTitles] = useState([]);
    const [ProjectTitle, SetProjectTitle] = useState("");

    function makeTime() {
        var d = new Date();
        var s = d.getSeconds();
        var m = d.getMinutes();
        var h = d.getHours();
        setArrivingTime(("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2));
    }
    setInterval(makeTime, 1000);

    function makeTwodigitNumber(number){
        let formattedNumber = number.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
        })
        return formattedNumber;
    }

    


    useEffect(() => {
        function makeDate(){
            var today = new Date();
    
            var date = today.getFullYear()+'-'+makeTwodigitNumber((today.getMonth()+1))+'-'+makeTwodigitNumber(today.getDate());
            setArrivingDate(date);
        }
        makeDate();
        db.collection("employees").onSnapshot((snapshot) => {
            const arr = snapshot.docs.map((doc) => ({
              ID: doc.id,
              name: doc.data().employeeName,
              position: doc.data().position,
            }));
      
            console.log(arr);
            setEmployees(arr);
          });


          //-----------project titles--------------------------
        db.collection("Con_Project").onSnapshot((snapshot) => {
            const arr = snapshot.docs.map((doc) => (doc.data().Title));
      
            
            SetProjectTitles(arr);
        });
          return ()=>{
              
          }

        
    }, [db])

    function morePressd(ID){
        alert("more clicked");
        editingAttendance.editAttendaceHandler(ID,arrivingDate)
    }






    return (
        <div className="justify-content-center">
            <Row className="justify-content-center mt-5">
                <h1 className="text-center text-warning">Mark Arriving</h1>
            </Row>
            <Row className="d-flex justify-content-center mt-3 bg-warning text-white">
                    <Col xs lg="2" className="d-flex align-items-center"><h6 className="text-center">Date: {arrivingDate} </h6></Col>
                    <Col xs lg="2" className="d-flex align-items-center"><h6 className="text-center">Time: {arrivingTime} </h6></Col>
                    <Col xs lg="1" className="d-flex align-items-center"><h6 className="text-right" >Project:</h6></Col>
                    <Col xs lg="2" className="d-flex align-items-center py-2">
                        <Form.Control as="select" value={ProjectTitle} onChange={(e)=>{SetProjectTitle(e.target.value);}}>
                            <option value="">select a project Title</option>
                            {ProjectTitles.map(Title=>(
                                 <option value={Title}>{Title}</option>
                            ))}            
                        </Form.Control>
                               
                    </Col>
            </Row>
            
            
            <Row className="justify-content-center mt-3" >
                <div className="searchBar" styles="width:100px">
                    <input id="searchQueryInput" maxwidth="100px" type="text" name="searchQueryInput" placeholder="Search" value="" />
                    <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                        <Search/>
                        
                    </button>
                </div>
            </Row>
           
            
            {employees.map((employee) => (
            <Row className="justify-content-center mt-2 ">
                <div className="arrivingSearchResults border pl-5 py-3">
                    <Row>
                    <Col xs lg="1" className="MarkArriving__align-me-v-center"><svg className="m-2" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                    </svg>
                    </Col>
                    <Col xs lg="8"><span>employeeID : {employee.ID}</span><br/>
                    <span>name : {employee.name}</span><br/>
                    <span>position : {employee.position}</span></Col>

                    <Col xs lg="2">

                        <Button variant="success" className="m-1 MarkArriving__arrvingMarkButton">Mark as arrived</Button><br/>
                        <Button variant="danger" className="m-1 MarkArriving__arrvingMarkButton">Mark as left</Button>
                    </Col>
                    <Col xs lg="1" className="MarkArriving__align-me-v-center">
                        <Link to='/adminPannel/attendanceManager/EditAttendance'  className="nav-link" >
                            <Button variant="link" onClick={() => { morePressd(employee.ID);}}>more</Button>
                        </Link>
                    </Col>
                    </Row>
                    
                </div>
            </Row>
                
                 
          ))}
            
                
            
        </div>
    )
}

export default MarkArriving
