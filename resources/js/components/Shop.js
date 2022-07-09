import React, {useCallback, useEffect, useRef, useState} from 'react';
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
    const [author, setAuthor] = useState(0);
    const [category, setCategory] = useState(0);
    const [rating, setRating] = useState(0);
    const [_sort, setSort] = useState('price-asc');
    const [paginate, setPaginate] = useState(5);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(null);

    const authorCallback = (i) => {
        setAuthor(i);
        setPage(1);
    }
    const categoryCallback = (i) => {
        setCategory(i);
        setPage(1);
    }
    const ratingCallback = (i) => {
        setRating(i);
        setPage(1);
    }
    const sortCallback = (i) => {
        setSort(i);
        setPage(1);
    }
    const paginateCallback = (i) => {
        setPaginate(i);
        setPage(1);
    }
    const pageCallback = (i, j) => {
        setPage(i);
    }
    const totalCallback = (i) => {
        setTotal(i);
    }

    return (
        <>
            <Container style={{padding: '3vw 0vw', minHeight: '50vh'}}>
                <Row>
                    <Col md={2} xs={12}>
                        <Row>
                            <Col md="auto" style={{padding: '10px 5px'}}>
                                <Row style={{margin: 'auto'}}>Author: </Row>
                                <Row style={{margin: 'auto'}}><AuthorFilter authorCallback={e => authorCallback(e)} /></Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto" style={{padding: '10px 5px'}}>
                                <Row style={{margin: 'auto'}}>Category: </Row>
                                <Row style={{margin: 'auto'}}><CategoryFilter categoryCallback={e => categoryCallback(e)}/></Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto" style={{padding: '10px 5px'}}>
                                <Row style={{margin: 'auto'}}>Rating: </Row>
                                <Row style={{margin: 'auto'}}><DropdownTypes type='rating' callback={e => ratingCallback(e)}/></Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={10} xs={12}>
                        <Row className="justify-content-md-center">
                            <Col md={{order: 'last', span: 2}} xs={12}
                                 style={{padding: '10px 5px'}}>
                                <Row style={{margin: 'auto'}}>Sort: </Row>
                                <Row style={{margin: 'auto'}}><DropdownTypes type='sort' callback={e => sortCallback(e)}/></Row>
                            </Col>
                            <Col md={{order: 'last', span: 2}} xs={12}
                                 style={{padding: '10px 5px'}}>
                                <Row style={{margin: 'auto'}}>Paginate: </Row>
                                <Row style={{margin: 'auto'}}><DropdownTypes type='paginate' callback={e => paginateCallback(e)}/></Row>
                            </Col>
                            <Col style={{display: "inline-block", alignSelf: "flex-end", padding: "10px 5px"}}>
                                <h3>
                                    {total===0? "No available book!":
                                    <CountNumberItem paginate={paginate} page={page} total={total} item="books" />}
                                </h3>
                            </Col>
                        </Row>
                        <Row style={{padding: '10px 5px'}}>
                            <GetBookShop query={{
                                'author': author,
                                'category': category,
                                'rating': rating,
                                '_sort': _sort,
                                'paginate': paginate,
                                'page': page,
                            }} callback={e => totalCallback(e)}/>
                        </Row>
                        <Row style={{padding: '10px 0vw'}}>
                            <Col md="auto">
                                <Pagination current={page} onChange={pageCallback} total={total} pageSize={paginate} showSizeChanger={false} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default Shop;

