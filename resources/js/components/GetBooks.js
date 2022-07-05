import React, {Component} from 'react';
import {ButtonGroup, Col, Container, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import BookCard from "./BookCard";
import axios from "axios";
import {Swiper, SwiperSlide} from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default class GetBooks extends Component {
    state = {
        books: []
    }

    componentDidMount() {
        var link;
        switch(this.props.type){
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
        axios.get(link)
            .then(res => {
                const books = res.data;
                this.setState({ books });
            })
            .catch(error => console.log(error));
    }

    render() {
        if(this.props.show !== 'carousel') {
            return <>
                <Container>
                    <Row sm={2} md={4} className="g-4">
                        {
                            this.state.books.map(book =>
                                <Col className="book-card">
                                    <BookCard id={book.id} title={book.title} author={book.author}
                                      orginal_price={book.original_price} price={book.price}
                                      image={book.photo}/>
                                </Col>)
                        }
                    </Row>
                </Container>
            </>;
        }
        else {
            return <>
                <Swiper
                    slidesPerView={4}
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
                    className="mySwiper"
                >
                    {
                        this.state.books.map(book =>
                            <SwiperSlide>
                                <div className="book-card">
                                    <BookCard id={book.id} title={book.title} author={book.author}
                                              orginal_price={book.original_price} price={book.price}
                                              image={book.photo}/>
                                </div>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </>;
        }
    }
}
