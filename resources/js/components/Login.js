import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import {Alert, Button, Card, Col, Container, Form, FormControl, InputGroup, Modal, Row} from "react-bootstrap";
import "../../css/app.css"
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setId} from "./redux/userSlice";

function Login(props) {
    //use state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('');

    //redux
    const dispatch = useDispatch();

    const handleSubmit = () => {
        event.preventDefault();
        const payload = {
            email,
            password
        };
        axios.post('/api/login', payload)
            .then(response => {
                if (response.data) {
                    dispatch(setId(response.data.id));
                    if (props !== null) {
                        props.setModal(false);
                    }
                }
            }).catch(error => {
                    console.log(error.response);
                    setMessage(error.response.data.message);
                    setAlert(true);
                });
    }
    if(window.location.href.toString().includes("/login")) document.title = 'BookWorm | Login';
    return (
        <>
            <Container style={{maxWidth: '500px', padding: '0'}}>
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
                                              onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Alert key="light" variant="light" align="center" show={alert} style={{padding: "2px"}}>
                                {message}
                            </Alert>
                            <Button id="account-button"
                                    type="submit" >
                                Log In
                            </Button>
                        </Form>
                        <Button id="account-button"
                                variant="light"
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
