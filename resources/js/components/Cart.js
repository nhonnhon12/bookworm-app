import React, {Component, useEffect, useState} from "react";
import {Alert, Button, Card, Col, Container, Form, ListGroup, Nav, Navbar, Row} from "react-bootstrap";
import CartItem from "./CartItem";
import {useDispatch, useSelector} from "react-redux";
import {selectCart} from "./redux/cartSlice";
import axios from "axios";

function Cart() {
    const cart = useSelector((state) => state.cart.items);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            var listId = '';
            var listNum = '';
            var c = 0;
            for(var i = 0; i < cart.length; i++){
                if(cart[i].num !== 0) {
                    listId += cart[i].id + ',';
                    listNum += cart[i].num + ',';
                    c += +cart[i].num;
                }
            }
            const link = '/api/price?id=' + listId + '&num=' + listNum;
            axios.get(link)
                .then(res => {
                    setTotal(res.data);
                    setCount(c);
                })
                .catch(error => console.log(error));
            mounted = false;
        }
    }, [cart]);

    return <>
        <Container>
            <Row style={{paddingTop: '40px', paddingLeft: '10px'}}>
                <h2><b>Your cart: {count} items</b></h2>
            </Row>
            <Row>
                <Col lg={9} sm={12}>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col md={6}>
                                    <b>Product</b>
                                </Col>
                                <Col md={2}>
                                    <b>Price</b>
                                </Col>
                                <Col md={2}>
                                    <b>Quantity</b>
                                </Col>
                                <Col md={2}>
                                    <b>Total</b>
                                </Col>
                            </Row>
                        </Card.Header>
                        <ListGroup variant="flush">
                            {
                                cart.map(book =>
                                    <CartItem id={book.id} num={book.num}/>
                                )
                            }
                        </ListGroup>
                    </Card>
                </Col>
                <Col lg={3} sm={12}>
                    <Card>
                        <Card.Header>
                                <b>
                                    Cart totals
                                </b>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <h3 align="center">
                                    ${total}
                                </h3>
                            </Row>
                            <Row>
                                <Button type="primary" id="cart-order-button"> Place order</Button>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
} export default Cart;
