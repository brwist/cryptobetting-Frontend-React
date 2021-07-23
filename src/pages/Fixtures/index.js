import React, { useState,useEffect} from "react";
import { Container, Row, Col,Table,Button,Label } from "reactstrap";
import { AvField, AvForm} from 'availity-reactstrap-validation';
import axios from 'axios'

const Fixture =() => {
    const [data,setData]=useState([]);
    const [loaded,setLoaded]=useState(false);
    const [toFilterGlobal,setToFilter]=useState("");
    const [fromFilterGlobal,setFromFilter]=useState("")
    const [err,setErr]=useState(false)

    const getFixtures = (toFilter,fromFilter) => {
        let url=""
        if((toFilter===undefined && fromFilter===undefined) || (toFilter==="" && fromFilter===""))
        url=`http://18.183.29.9:9000/api/fixtures`
        else if(fromFilter===undefined || fromFilter==="" )
        url=`http://18.183.29.9:9000/api/fixtures?to=${toFilter}`
        else if(toFilter===undefined || toFilter==="" )
        url=`http://18.183.29.9:9000/api/fixtures?from=${fromFilter}`
        else
        url=`http://18.183.29.9:9000/api/fixtures?from=${fromFilter}&to=${toFilter}`

        axios.get(url,{
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
        
    }
    const handleSubmit = (event, values) => {
        if(values.fromFilter>values.toFilter)
        setErr(true)
        else
        setErr(false)

        setToFilter(values.toFilter);
        setFromFilter(values.fromFilter);
        getFixtures(values.toFilter,values.fromFilter)
        
    }
    useEffect(() => {
        getFixtures();
      }, [])
    useEffect(() => {
        const fetch = setInterval(() => {
          //fetch
          getFixtures(toFilterGlobal,fromFilterGlobal)
        }, 30000)
        return () => clearInterval(fetch);
      }, [toFilterGlobal,fromFilterGlobal])

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                    <Row className="pt-5">
                        {err ? <p className="text-danger">To value should be greater than From value.</p> : null}
                        <AvForm className="form-horizontal" onValidSubmit={ handleSubmit }>
                        <Row>
                            <Col md={4}>
                                <Label>From</Label>
                                <AvField type="text" name="fromFilter" className="form-control" id="fromFilter" placeholder="From" >
                                </AvField>
                               
                            </Col>
                            <Col md={4}>
                                <Label>To</Label>
                                <AvField type="text" name="toFilter" className="form-control" id="toFilter" placeholder="To" >
                                </AvField>
                            </Col>
                            <Col md={4}>
                                <Button color="primary" className="w-md waves-effect waves-light" type="submit" style={{"marginTop":"1.8rem"}}>Filter</Button>
                            </Col>
                        </Row>
                        </AvForm>
            
                        </Row>
                        <Row>
                        <Col xl={12} >
                            <h4 className="py-3">Fixtures</h4>

                            <div className="table-responsive ">
                                            <Table className="mb-0 fixture" striped>
                                            <thead>
                                                <tr>
                                                    <th >FixtureID</th>
                                                    <th >Start Time</th>
                                                    <th >Market End Time</th>
                                                    <th >Expiry time</th>
                                                    <th >Price</th>
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
                                                    { info.price == null ?
                                                         <td>-</td> :
                                                         <td>${info.price}</td>  
                                                    }   
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
