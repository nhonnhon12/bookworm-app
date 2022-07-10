import React, {Component, useEffect, useState} from "react";
import {Alert, Button, Col, Container, Form, Nav, Navbar, Row} from "react-bootstrap";
import CartItem from "./CartItem";

function Cart() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('book-cart')));

    return <>
        <Container>
            <Row style={{paddingTop: '40px', paddingLeft: '10px'}}>
                <h2><b>Your cart: 5 items</b></h2>
            </Row>
            <Row>
                <Col lg={10} sm={12}>
                    <Row id="cart-detail">
                        {
                            cart.map(book =>
                                <CartItem id={book.id} num={book.num}/>
                            )
                        }
                    </Row>
                </Col>
                <Col lg={2} sm={12}>
                    <div id="cart-order">
                        <Row>
                            <div>
                                <h2>
                                    Cart total
                                </h2>
                            </div>
                        </Row>
                        <Container id={"cart-order-div"}>
                            <Row>
                                <Form.Group style={{padding:"0"}}>
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="number" value={0} id="quantity"/>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Button type="primary" id="cart-order-button"> Place order</Button>
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row>
            <br/>
        </Container>
    </>

} export default Cart;
