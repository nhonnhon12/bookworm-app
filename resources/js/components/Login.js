import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import {Button, Card, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import "../../css/app.css"

function Login() {
    const [valid, setValid] = useState(true);
    const handleSubmit = () => {
        setValid(false);
    }
    return (
        <>
            <Container style={{maxWidth: '30vw', padding: '0'}}>
                <Card>
                    <Card.Header>
                        <h2 style={{margin: '5px'}}>
                            <strong>
                                <center>
                                    Login
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
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                />
                            </Form.Group>
                            <Button id="account-button"
                                    type="submit" >
                                Log In
                            </Button>
                        </Form>
                        <Button id="account-button"
                                variant="outline-primary"
                                href="/register"
                        >
                            Create new account
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
} export default Login;
