import React, { useState,useEffect} from "react";
import { Container, Row, Col } from "reactstrap";


import ResponsiveTable from "./ResponsiveTable";

const Dashboard =() => {

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Row>
                            <Col xl={12}>
                                <ResponsiveTable/>
                            </Col>

                            <Col xl={4}>

                            </Col>
                        </Row>

                    </Container> 
                </div>
            </React.Fragment>
        );
    
}

export default Dashboard;
