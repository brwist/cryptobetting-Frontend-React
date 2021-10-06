import React from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Container, Table } from "reactstrap";
import {numberWithCommas} from "../../utils/numberWithCommas"

const ResponsiveTable = (props) => {
    let expiries;
    if(props.tableData.data.expiries!==undefined)
    expiries= props.tableData.data.expiries;
    else
    expiries=[]
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Row>
                        {
                            expiries.length!==0 ?  
                            expiries.map((info, index) => (
                                <Col xs={12} key={index}>
                                <Card>
                                    <CardBody>
                                    {/* <h4 className="card-title text-center py-3 h2">Expiry Time : {expiryTimeToLocaleString(props.tableData.data.expTime)}{" "}<span className="float-right mr-2">({calcTimeDifference(Math.abs(new Date(props.tableData.data.expTime) - new Date()))} to expiration){" "}{" "}</span></h4> */}
                                    <h4 className="card-title text-center py-3 h2">Fixture ID : {info.id}</h4>
                                        <div className="table-rep-plugin">
                                            <div className="table-responsive mb-0" data-pattern="priority-columns">
                                                <Table id="tech-companies-1" responsive>
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            {info.probabilities.map((proba, i) => (
                                                                <React.Fragment key={i}>
                                                                    <th>{numberWithCommas(proba.strike)}</th>
                                                                </React.Fragment>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><span className="over-head">OVER</span></td>
                                                            {info.probabilities.map((proba, i) => (
                                                                <React.Fragment key={i+"over"}>
                                                                <td><span className="over ">{(0.97/proba.over).toFixed(2)}</span></td>
                                                                </React.Fragment>
                                                            ))}
                                                        </tr>
                                                        <tr>
                                                        <td><span className="under-head ">UNDER</span></td>
                                                            {info.probabilities.map((proba, i) => (
                                                                 <React.Fragment key={i+"under"}>
                                                                 <td><span className="under ">{(0.97/proba.under).toFixed(2)}</span></td>
                                                                 </React.Fragment>
                                                            ))}
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            )): 
                            <h4>Loading data ...........</h4>
                            }
                             
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    
}

const mapStateToProps = (store) => ({
    tableData: store.tableData,
  });
export default connect(mapStateToProps, {})(ResponsiveTable);
