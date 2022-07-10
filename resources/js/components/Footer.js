import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Col, Container, Row} from "react-bootstrap";

const footerStyle={
    backgroundColor: "rgb(242,242,242)",
    padding: "80px",
    minHeight: "25vh",
    marginTop: "50px"
}
function Footer() {
    return (
        <>
            <div style={footerStyle}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={1} sm={12}>
                            <img
                                alt="bookworm-logo"
                                src="https://v5.bootcss.com/docs/5.1/assets/brand/bootstrap-logo.svg"
                                width="65"
                                height="65"
                                className="d-inline-block align-top"
                            />
                        </Col>
                        <Col md={6} sm={12}>
                            <b>BOOKWORM</b><br/>
                            Address: Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                            Phone Number: +XX XXXXXXXX
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    );
} export default Footer;
