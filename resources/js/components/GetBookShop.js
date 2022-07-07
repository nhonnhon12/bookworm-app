import React, {Component, useEffect, useState} from 'react';
import {ButtonGroup, Col, Container, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import BookCard from "./BookCard";
import axios from "axios";
import "../../css/app.css"
// Import Swiper styles
import "swiper/css";
import {Swiper, SwiperSlide} from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";

function GetBookShop(props){
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            let link = '/api/books' + props.query;
            axios.get(link)
                .then(res => {
                    setList(res.data.data);
                    setTotal(res.data.total);
                })
                .catch(error => console.log(error));
            mounted = false;
        }
    },[] );

    //show list of book in shop page (5 books per rows)
    return <>
        <Container>
            <Row xs={2} lg={5} className="g-4">
                {
                    list.map(book =>
                        <Col className="book-card">
                            <BookCard id={book.id} title={book.title} author={book.author}
                                      orginal_price={book.original_price} price={book.price}
                                      image={book.photo} rating={book.rating}/>
                        </Col>)
                }
            </Row>
        </Container>
    </>;
} export default GetBookShop;

