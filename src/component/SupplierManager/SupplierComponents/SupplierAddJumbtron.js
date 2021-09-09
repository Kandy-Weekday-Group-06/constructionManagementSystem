import React from 'react'
import { Jumbotron,Row,Image,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import addSupplierIcon from "../Images/addSupplier_image.png";
import "../Styles/SupplierAddJumbtron.css";

export default function SupplierAddJumbtron() {
    return (
        <div className= "container">
        <Jumbotron className="supplierAddJumbotron">
            <Image src={addSupplierIcon} fluid className= "supplierAddIcon"/> 
            <br/>
            <Row className = "supplierJumbotronHeaderBackground">
                <h1 className= "supplierH1">Add New Supplier? </h1> 
            </Row>
            <br/>
            <p>
                This is a simple hero unit, a simple jumbotron-style component for calling
                extra attention to featured content or information.
            </p>
            <br/>
            <p>
                <Link to ="/adminPannel/supplierManager/addSupplier"><Button variant="outline-warning" className = "supplierAddSupplierBtn" size= "md">Add Supplier</Button></Link>
            </p>
        </Jumbotron>
    </div>
    )
}
