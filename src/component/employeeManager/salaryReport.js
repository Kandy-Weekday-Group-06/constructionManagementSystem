import React from 'react';
import firebase from "../../firebase";
import { useEffect,useState } from 'react';
const db = firebase.firestore();

function SalaryReport(props) {
    
    const [year, setYear] = useState(props.year);
    const [month, setmonth] = useState(props.month);
    const[record,setRecord]=useState([]);
    //new

    useEffect(()=>{
        console.log("inside useeffect");
        console.log("year>>",year,"month>>",month);
        
        db.collection("Salary").where("year","==","2021").where("month","==","08").onSnapshot((querySnapshot)=>{
            const array = querySnapshot.docs.map((doc)=>({
            
                    data : doc.data(),
                    key : doc.id,
            }));

            setRecord(array);
            console.log("records>>>>>>>>",array);
            console.log("records>>>>>>>>",record);
        })

        
        


    },[db]); 

 return (
        <div>
            
        </div>
    )
}

export default SalaryReport

