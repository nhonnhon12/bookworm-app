import React, {Component} from 'react';
import {ButtonGroup, Col, Container, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import BookCard from "./BookCard";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
                                <Col style = {{ padding: '10px'}}>
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
            const responsive = {
                superLargeDesktop: {
                    // the naming can be any, depends on you.
                    breakpoint: { max: 4000, min: 3000 },
                    items: 8
                },
                desktop: {
                    breakpoint: { max: 3000, min: 1024 },
                    items: 4
                },
                tablet: {
                    breakpoint: { max: 1024, min: 464 },
                    items: 2
                },
            };
            return <>
                <Carousel swipeable={false}
                          draggable={false}
                          showDots={true}
                          responsive={responsive}
                          ssr={true} // means to render carousel on server-side.
                          infinite={true}
                          autoPlay={this.props.deviceType !== "mobile"}
                          autoPlaySpeed={5000}
                          keyBoardControl={true}
                          customTransition="all .5"
                          transitionDuration={10}
                          containerClass="carousel-container"
                          removeArrowOnDeviceType={["tablet", "mobile"]}
                          deviceType={this.props.deviceType}
                          dotListClass="custom-dot-list-style"
                          itemClass="carousel-item-padding-40-px">
                    {

                        this.state.books.map(book =>
                            <div style = {{ padding: '10px' }}>
                                <BookCard id={book.id} title={book.title} author={book.author}
                                  orginal_price={book.original_price} price={book.price}
                                  image={book.photo}/>
                            </div>
                        )
                    }
                </Carousel>
            </>;
        }
    }
}
