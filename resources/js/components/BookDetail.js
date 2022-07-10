import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import '../../css/app.css'
import {useDispatch, useSelector} from "react-redux";
import {selectCart, setItem} from "./redux/cartSlice";

function BookDetail(props){
    const [book, setBook] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [alert, setAlert] = useState(false);
    let id = useParams().id;

    const cart = useSelector(selectCart);
    const dispatch = useDispatch();

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const link = '/api/books/' + id;
            axios.get(link)
                .then(res => {
                    setBook(res.data);
                })
                .catch(error => console.log(error));
            mounted = false;
        }
        var i = 0;
        for (i = 0; i < cart.length; i++){
            if(cart[i].id == id) break;
        }
        if(i!==cart.length) setQuantity(cart[i].num);
    },[] );

    const addBook = () =>{
        dispatch(setItem({id: book.id, num: quantity}));
    }

    const changeQuantity = (e) => {
        if(e.target.value < 0) {
            setQuantity(0);
        }
        else if(e.target.value > 8){
            setQuantity(8);
            setAlert(true);
            setTimeout(
                () => {
                    setAlert(false);
                },
                3000
            );
        }
        else {
            setQuantity(e.target.value);
        }
    }

    if(book !== null) return<>
        <Container>
            <Row style={{paddingTop: '40px', paddingLeft: '10px'}}>
                <h2><b>{book.category}</b></h2>
            </Row>
            <Row>
                <Col lg={8} sm={12}>
                    <Row id="book-detail">
                        <Col lg={4} sm={12}>
                            <img src={require('./../../assets/bookcover/' + book.photo + '.jpg').default} className="img-fluid rounded-start" alt="book photo"/>
                            <p align="right" style={{paddingTop:"5px"}}><small>By (author): <b>{book.author}</b></small></p>
                        </Col>
                        <Col lg={8} sm={12}>
                            <div>
                                <h2><b>{book.title}</b></h2>
                                <p>{book.summary}</p>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} sm={12}>
                    <div id="add-book">
                        <Row>
                            <div>
                                <h2>
                                    {
                                        book.price !== null &&
                                        <small>
                                            <del>
                                                ${book.original_price}
                                            </del>&nbsp;&nbsp;&nbsp;
                                        </small>
                                    }
                                    <strong>${book.price !== null ? book.price : book.original_price}</strong>
                                </h2>
                            </div>
                        </Row>
                        <Container id="add-book-div">
                            <Row>
                                <Form.Group style={{padding:"0"}}>
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="number" value={quantity} onChange={changeQuantity} id="quantity"/>
                                    <Alert key="light" variant="light" show={alert} style={{marginTop:"5px"}}>
                                        Maximum of quantity is 8 books.
                                    </Alert>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Button type="primary" id="add-book-button" onClick={addBook}> Add to cart </Button>
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col lg={8} sm={12}>
                    <Row id="book-detail">
                        Review Section
                    </Row>
                </Col>
                <Col lg={4} sm={12}>
                    <div id="add-book">
                        <Container id="add-book-div">
                            <Row>
                                <Button type="primary" id="add-book-button"> Post Review </Button>
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
    else return <></>;
}export default BookDetail;
