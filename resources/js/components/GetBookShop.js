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

export default class GetBookShop extends Component {
    state = {
        books: [],
        total: null,
    }

    componentDidMount() {
        var link = '/api/books/' + this.props.type;
        console.log(link);
        axios.get(link)
            .then(res => {
                const books = res.data;
                this.setState({ books: books.data });
                this.setState({ total: books/total });
            })
            .catch(error => console.log(error));
    }

    render() {
        //show list of book in shop page (5 books per rows)
        console.log('1');
        return <>
            <Container>
                <Row xs={2} lg={5} className="g-4">
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
}
