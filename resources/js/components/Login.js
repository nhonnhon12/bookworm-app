import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import {Card, Col, Container, Row} from "react-bootstrap";

function Login() {
    return (
        <>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title><b><h3>BookWorm</h3></b></Card.Title>
                    <Card.Text>
                        Address: ABC, X <br/>
                        Phone: (+XX) XXXXXXXX
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
} export default Login;

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}
