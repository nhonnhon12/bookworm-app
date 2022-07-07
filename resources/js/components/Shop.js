import React, {useCallback, useEffect, useRef, useState} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Col, Container, Row} from "react-bootstrap";
import AuthorFilter from "./AuthorFilter";
import CategoryFilter from "./CategoryFilter";
import DropdownTypes from "./DropdownTypes";
import {Pagination} from "antd";
import 'antd/dist/antd.css';
import GetBookShop from "./GetBookShop";
import CountNumberItem from "./CountNumberItem";
import {value} from "lodash/seq";

function Shop() {
    let props = {
        'author': 0,
        'category': 0,
        'rating': 0,
        '_sort': 0,
        'paginate': 5,
        'page': 1,
        'total': 0
    };

    function queryBuilder() { //build query for api
        let q = '?';
        props.author !== 0 ? q += '&author=' + props.author: 1;
        props.category !== 0 ? q += '&category=' + props.category: 1;
        props.rating !== 0 ? q += '&rating=' + props.rating: 1;
        props._sort !== 0 ? q += '&sort=' + props._sort: 1;
        props.paginate !== 0 ? q += '&paginate=' + props.paginate: 1;
        props.page !==0 ? q+= '&page=' + props.page: 1;
        return q;
    }

    return (
        <>
            <Container style={{padding: '3vw 0vw'}}>
                <Row>
                    <Col md={2} xs={12}>
                        <Row>
                            <Col md="auto" style={{padding: '10px 5px'}}>
                                <Row>Author: </Row>
                                <Row><AuthorFilter /></Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto" style={{padding: '10px 5px'}}>
                                <Row>Category: </Row>
                                <Row><CategoryFilter/></Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto" style={{padding: '10px 5px'}}>
                                <Row>Rating: </Row>
                                <Row><DropdownTypes type='rating'/></Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={10} xs={12}>
                        <Row className="justify-content-md-center">
                            <Col md={{order: 'last', span: 3}} xl={{order: 'last', span: 2}} xs={12}
                                 style={{padding: '10px 5px'}}>
                                <Row>Sort: </Row>
                                <Row><DropdownTypes type='sort'/></Row>
                            </Col>
                            <Col md={{order: 'last', span: 3}} xl={{order: 'last', span: 2}} xs={12}
                                 style={{padding: '10px 5px'}}>
                                <Row>Paginate: </Row>
                                <Row><DropdownTypes type='paginate'/></Row>
                            </Col>
                            <Col style={{display: "inline-block", alignSelf: "flex-end", padding: "5px"}}>
                                <h3><CountNumberItem per={props.paginate} page={props.page} total={props.total} item="books"/></h3>
                            </Col>
                        </Row>
                        <Row style={{padding: '10px 5px'}}>
                            <GetBookShop query={queryBuilder()}/>
                        </Row>
                        <Row style={{padding: '10px 0vw'}}>
                            <Col md="auto">
                                <Pagination defaultCurrent={props.page} total={props.total}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default Shop;

