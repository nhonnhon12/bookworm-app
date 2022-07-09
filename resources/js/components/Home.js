import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import BookCard from "./BookCard";
import {Button, Col, Container, Nav, Row} from "react-bootstrap";
import GetBooks from "./GetBooks";
import HomeFeaturedBook from "./HomeFeaturedBook";

function Home() {
    const [tab, setTab] = useState(0);
    console.log("home tab = " + tab);
    return (
        <div style={{padding: '10px'}}>
            <Container>
                <Row style={{padding: '80px 20px 3px 20px'}}>
                    <Col md={4}>
                        <h1>On Sale</h1>
                    </Col>
                    <Col xs={{ span: '8', order: 'last' }}>
                        <div align="right">
                            <Button variant="primary" href="/shop"> View all &#10132;</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className="home-component">
                <GetBooks type="get-top-discount" show='carousel'/>
            </Container>
            <Container>
                <Row style={{padding: '50px 20px 3px 20px'}}>
                    <h1 align="center">Featured Books</h1>
                </Row>
                <Row style={{padding: '3px 20px 6px 20px'}}>
                    <Nav variant="pills" defaultActiveKey="recommended" className="justify-content-center">
                        <Nav.Item>
                            <Nav.Link eventKey="recommended" onSelect={()=>setTab(0)}>Recommended</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="popular" onSelect={()=>setTab(1)}>Popular</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>
            </Container>
            <Container className="home-component">
                <HomeFeaturedBook tab={tab}/>
            </Container>
        </div>
    );
} export default Home
