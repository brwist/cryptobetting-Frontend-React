// availity-reactstrap-validation
import { AvField, AvForm } from 'availity-reactstrap-validation';
import React, { useCallback, useState } from 'react';
import { Link, Redirect, useLocation, withRouter } from 'react-router-dom';
import { Alert, Button, Col, Container, FormGroup, Input, Label, Row } from "reactstrap";

// import images
const Login = (props) => {
    const [loginStatus, checkLoginSuccess] = useState(true)

    const handleSubmit = (event, values) => {
        checkLoginSuccess(false)
    }
    return (
        <React.Fragment>
            <div>
                <Container fluid className="p-0">
                    <Row className="no-gutters">
                        <Col lg={ 12 }>
                            <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                                <div className="w-100">
                                    <Row className="justify-content-center">
                                        <Col lg={ 4 }>
                                            <div>
                                                <div className="text-center">
                                                    <div>
                                                        <Link to="/" className="logo">
                                                            {/* <img src={ logodark } height="20" alt="logo" /> */ }BO
                                                        </Link>
                                                    </div>

                                                    <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                                                    <p className="text-muted">Sign in to continue to BO.</p>
                                                </div>
                                                {
                                                    typeof loginStatus === 'boolean' ?
                                                        loginStatus == true ?
                                                           null
                                                            : <Alert color="danger">Invalid username password combination</Alert>
                                                        :  <Alert color="danger">Invalid username password combination</Alert>
                                                }
                                                <div className="p-2 mt-5">
                                                    <AvForm className="form-horizontal" onValidSubmit={ handleSubmit } >

                                                        <FormGroup className="auth-form-group-custom mb-4">
                                                            <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                            <Label htmlFor="useremail">Email</Label>
                                                            <AvField name="email" value="" type="email" className="form-control" id="useremail" validate={ { email: true, required: true } } placeholder="Enter email" />
                                                        </FormGroup>

                                                        <FormGroup className="auth-form-group-custom mb-4">
                                                            <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                            <Label htmlFor="userpassword">Password</Label>
                                                            <AvField name="password" value="" type="password" className="form-control" id="userpassword"  validate={ { required: true } }  placeholder="Enter password" />
                                                        </FormGroup>

                                            
                                                        <div className="mt-4 text-center">
                                                            <Button color="primary" className="w-md waves-effect waves-light" type="submit">Log In</Button>
                                                        </div>

                                                        {/* <div className="mt-4 text-center">
                                                            <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock mr-1"></i> Forgot your password?</Link>
                                                        </div> */}
                                                    </AvForm>
                                                </div>

                                                {/* <div className="mt-5 text-center">
                                                    <p>Don't have an account ? <Link to="/register" className="font-weight-medium text-primary"> Register </Link> </p>
                                                </div> */}
                                            </div>

                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                       
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}
export default withRouter(Login);