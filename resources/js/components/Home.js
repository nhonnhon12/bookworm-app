import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import BookCard from "./BookCard";
import {Col, Container, Row} from "react-bootstrap";
import GetBooks from "./GetBooks";

function Home() {
    return (
        <>
            <Container style={{padding: '3vw 10vw'}}>
                <h1 align={"center"}>Top Discount</h1>
                <GetBooks type="get-top-discount" show='carousel'/>
            </Container>
            <Container style={{padding: '0vw 10vw'}}>
                <h1 align={"center"}>Popular Books</h1>
                <GetBooks type="get-popular" />
            </Container>
            <Container style={{padding: '0vw 10vw'}}>
                <h1 align={"center"}>Recommend Books</h1>
                <GetBooks type="get-recommended"/>
            </Container>
        </>
    );
} export default Home
