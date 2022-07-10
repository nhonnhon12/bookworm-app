import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Button, Card, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import "../../css/app.css"

function Register() {
    const [valid, setValid] = useState(true);
    const handleSubmit = () => {
        setValid(false);
    }
    return (
        <>
            <Container style={{maxWidth: '30vw'}}>
                <Card>
                    <Card.Header>
                        <h2 style={{margin: '5px'}}>
                            <strong>
                                <center>
                                    Register
                                </center>
                            </strong>
                        </h2>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email"
                                              placeholder="name@example.com"
                                              required
                                />
                            </Form.Group>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom01">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="First name"
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom02">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Last name"
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="inputPassword5">Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                />
                            </Form.Group>
                            <Button  id="account-button"
                                     type="submit">
                                Register
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
} export default Register;
