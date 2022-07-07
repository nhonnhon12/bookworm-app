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

function GetBooks(props){
    const [list, setList] = useState([]);

    console.log('1');

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            let link;
            switch(props.type){
                case 'get-recommended':
                    link = '/api/books/get-recommended';
                    break;
                case 'get-popular':
                    link = '/api/books/get-popular';
                    break;
                case 'get-top-discount':
                    link = '/api/books/get-top-discount';
                    break;
                default:
                    link = '/api/books/' + this.props.type;
                    break;
            }
            console.log('2');
            console.log(link);
            axios.get(link)
                .then(res => {
                    setList(res.data);
                    console.log(res.data);
                })
                .catch(error => console.log(error));
            mounted = false;
        }
    },[] );

    if(props.show !== 'carousel') {
        return <>
            <Container>
                <Row xs={2} lg={4} className="g-4">
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
    }
    //show list of book in top discount (using carousel)
    else {
        return <>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                }}
                breakpoints={{
                    992 : {slidesPerView: 4},
                    0 : {slidesPerView: 2}
                }}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                spaceBetween={0}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="bookSwiper"
            >
                {
                    list.map(book =>
                        <SwiperSlide className="swiper-slide">
                            <div className="book-card">
                                <BookCard id={book.id} title={book.title} author={book.author}
                                          orginal_price={book.original_price} price={book.price}
                                          image={book.photo} rating={book.rating}/>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </>;
    }
} export default GetBooks;
