import React, {Component} from 'react';
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

export default class GetBooks extends Component {
    state = {
        books: []
    }

    componentDidMount() {
        //get data from api
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
        console.log(link);
        axios.get(link)
            .then(res => {
                const books = res.data;
                this.setState({ books });
            })
            .catch(error => console.log(error));
    }

    render() {
        //show list of book in popular and recommended (4 books per rows)
        if(this.props.show !== 'carousel') {
            return <>
                <Container>
                    <Row xs={2} lg={4} className="g-4">
                        {
                            this.state.books.map(book =>
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
                        this.state.books.map(book =>
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
    }
}
