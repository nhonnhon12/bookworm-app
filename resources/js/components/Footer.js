import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import {Col, Row} from "react-bootstrap";

function Footer() {
    const footerStyle = {
        margin: 20,
    }
    return (
        <>
            <div style={footerStyle}>
                <Row>
                    <Col md="auto">
                        <img
                            alt="bookworm-logo"
                            src="https://v5.bootcss.com/docs/5.1/assets/brand/bootstrap-logo.svg"
                            width="64"
                            height="66"
                            className="d-inline-block align-top"
                        />
                    </Col>
                    <Col md="auto">
                        <b>BOOKWORM</b><br/>
                        Address: Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                        Phone Number: +XX XXXXXXXX
                    </Col>
                </Row>
            </div>
        </>
    );
} export default Footer;
