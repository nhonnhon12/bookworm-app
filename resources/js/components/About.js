import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Card, Col, Container, Row} from "react-bootstrap";

const style={
    h1: {
        textTransform: "none !important",
    },
    header:{
        paddingBottom: "5px",
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: "lightgray",
        marginBottom: "20px",
        fontSize: "30px",
        fontWeight: "bold"
    },
    title:{
        fontSize: "40px",
        textAlign: "center",
        fontWeight: "bold",
        padding: "30px 0px 5px 0px",
    },
    text1:{
        fontSize: "20px",
    },
    text2:{
        fontSize: "18px",
    }
}

function About() {
    document.title = 'BookWorm | About';
    return (
        <>
            <Container>
                <Row>
                    <Col style={style.header}>
                        About Us
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={9} style={style.title}>
                        Welcome to BookWorm
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={9} style={style.text1}>
                        "Bookworm is an independent New York bookstore and language school with
                        locations in Manhattan and Brooklyn. We specialize in travel books and language
                        classes."
                    </Col>
                    <Row className="justify-content-md-center">
                        <Col md={4}>
                            <Row style={style.title}>
                                Our Story
                            </Row>
                            <Row style={style.text2}>
                                The name Bookworm was taken from the
                                original name for New York International AirPort,
                                which was renamed JFK in December 1963.
                                <br/>
                                Our Manhattan store has just moved to the
                                West Village. Our new locations is 170 7th
                                Avenue South, at the corner of Perry Street.
                                <br/>
                                From March 2008 through May 2016, the store
                                was located in the Flatiron District.
                            </Row>
                        </Col>
                        <Col md={1}></Col>
                        <Col md={4}>
                            <Row style={style.title}>
                                Our Vision
                            </Row>
                            <Row style={style.text2}>
                                One of the last travel bookstores in the country,
                                our Manhattan store carries a range of
                                guidebooks (all 10% off) to suit the needs and
                                tastes of every traveler and budget.
                                <br/>
                                We believe that a novel or travelogue can be
                                just as valuable a key to a place as any
                                guidebook, and our well-read, well-traveled staff
                                if happy to make reading recommendations for
                                any traveler, book lover, or gift giver.
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </>
    );
} export default About;

