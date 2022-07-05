import React, {Component} from 'react';
import {Carousel, Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import BookCard from "./BookCard";
import axios from "axios";

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
                    <Row sm={1} md={4} className="g-4">
                        {
                            this.state.books.map(book =>
                                <Col>
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
                <Carousel slide>
                        {
                            this.state.books.map(book =>
                                <Carousel.Item interval={10000}>
                                    <BookCard id={book.id} title={book.title} author={book.author}
                                              orginal_price={book.original_price} price={book.price}
                                              image={book.photo}/>
                                </Carousel.Item>)
                        }
                </Carousel>
            </>;
        }
    }
}
