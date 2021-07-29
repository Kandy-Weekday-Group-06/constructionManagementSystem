import React,{useState, useEffect} from 'react';
import { Row} from 'react-bootstrap';
import './MarkArriving.css';
import { Search } from 'react-bootstrap-icons';

function MarkLeaving() {

    const [arrivingTime, setArrivingTime] = useState("");
    const [arrivingDate, setArrivingDate] = useState("");

    function makeTime() {
        var d = new Date();
        var s = d.getSeconds();
        var m = d.getMinutes();
        var h = d.getHours();
        setArrivingTime(("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2));
    }
    setInterval(makeTime, 1000);

    function makeDate(){
        var today = new Date();

        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        setArrivingDate(date);
    }
    useEffect(() => {
        makeDate();
    }, [])



    return (
        <div className="justify-content-sm-center">
            <Row className="justify-content-sm-center mt-5">
                <h1 className="text-center text-warning">Mark Leaving</h1>
            </Row>
            <Row className="justify-content-sm-center mt-3">
                <h6 className="text-center">Date: {arrivingDate} </h6>
            </Row>
            <Row className="justify-content-sm-center mt-1">
                <h6 className="text-center">Time: {arrivingTime} </h6>
            </Row>
            <Row className="justify-content-sm-center mt-1" >
                <div className="searchBar" styles="width:100px">
                    <input id="searchQueryInput" maxwidth="100px" type="text" name="searchQueryInput" placeholder="Search" value="" />
                    <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                        <Search/>
                        
                    </button>
                </div>
            </Row>
            <Row className="justify-content-sm-center mt-2">
                <div className="arrivingSearchResults">

                </div>
            </Row>
            <Row className="justify-content-sm-center mt-2">
                <div className="arrivingSearchResults">

                </div>
            </Row>
            <Row className="justify-content-sm-center mt-2">
                <div className="arrivingSearchResults">

                </div>
            </Row>
        
        </div>
    )
}

export default MarkLeaving
