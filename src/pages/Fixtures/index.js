import React, { useState,useEffect} from "react";
import { Container, Row, Col,Table } from "reactstrap";
import axios from 'axios'
const Fixture =() => {
    const [data,setData]=useState([]);
    const [loaded,setLoaded]=useState(false);

    useEffect(() => {
        axios.get('http://18.183.29.9:9000/api/fixtures',{
            headers:{
                'Content-Type': 'application/json',
            }
           }   
           ).then((response)=>{
                setData(response.data);
                setLoaded(true)
           }).catch((error)=>{
               // console.log("error",error)
           })    
        
    }, [])

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Row>
                        <Col xl={12} >
                            <h4 className="py-5">Fixtures</h4>

                            <div className="table-responsive ">
                                            <Table className="mb-0 fixture" striped>
                                            <thead>
                                                <tr>
                                                    <th >FixtureID</th>
                                                    <th >Start Time</th>
                                                    <th >Market End Time</th>
                                                    <th >Expiry time</th>
                                                    <th >Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>      
                                                {loaded ? 
                                                data.map((info,index)=>(
                                                    <tr key={index} >
                                                    <td>{info.id}</td>
                                                    <td>{new Date(info.startTime).toLocaleString()}</td>
                                                    <td>{new Date(info.marketEndTime).toLocaleString()}</td>
                                                    <td>{new Date(info.endTime).toLocaleString()}</td>
                                                    { info.status == null ?
                                                         <td>-</td> :
                                                         <td>{info.status}</td>  
                                                    }   
                                                                  
                                                </tr>
                                                ))
                                                :
                                                <tr>
                                                    <th>-</th>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>             
                                                </tr>
                                                }
                                        </tbody>
                                        </Table>
                                    </div>
                            </Col>

                        </Row>

                    </Container> 
                </div>
            </React.Fragment>
        );
    
}

export default Fixture;
