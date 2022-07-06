import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Col, Container, Row} from "react-bootstrap";
import AuthorFilter from "./AuthorFilter";
import CategoryFilter from "./CategoryFilter";
import DropdownTypes from "./DropdownTypes";
import {Pagination} from "antd";
import 'antd/dist/antd.css';
import GetBookShop from "./GetBookShop";

class Shop extends React.Component{
    state={
        page: 1,
        paginate: 5,
        author: null,
        category: null,
        rating: null,
        sort: 'price-up',
    }

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <Container style={{padding: '3vw 0vw'}}>
                    <h1 align={"center"}>Shop</h1>
                    <Row className="justify-content-md-center" style={{padding: '10px 0vw'}}>
                        <Col md="auto">Filter: <AuthorFilter /></Col>
                        <Col md="auto">Category: <CategoryFilter /></Col>
                        <Col md="auto">Rating: <DropdownTypes type='rating' /></Col>
                    </Row>
                    <Row className="justify-content-md-center" style={{padding: '10px 0vw'}}>
                        <Col md="auto">Sort: <DropdownTypes type='sort' /></Col>
                        <Col md="auto">Paginate: <DropdownTypes type='paginate' /></Col>
                    </Row>
                    <Row className="justify-content-md-center" style={{padding: '10px0vw'}}>
                        <GetBookShop type="?&&rating=3&paginate=20" show='shop'/>
                    </Row>
                    <Row className="justify-content-md-center" style={{padding: '10px 0vw'}}>
                        <Col md="auto">
                            <Pagination defaultCurrent={1} total={50} />;
                        </Col>
                        <Col md="auto">

                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
export default Shop;

