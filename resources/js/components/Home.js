import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import BookCard from "./BookCard";
import {Col, Row} from "react-bootstrap";
import GetBooks from "./GetBooks";

function Home() {

    return (
        <>
            <h1 align={"center"}>Top Discount</h1>
            <GetBooks type="get-top-discount" show='carousel'/>
            <h1 align={"center"}>Recommend Books</h1>
            <GetBooks type="get-recommended"/>
            <h1 align={"center"}>Popular Books</h1>
            <GetBooks type="get-popular" />
        </>
    );
} export default Home
