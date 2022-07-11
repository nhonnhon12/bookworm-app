import React, {Component, useEffect, useState} from "react";
import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Form,
    ListGroup,
    Modal,
    ModalBody,
    Nav,
    Navbar,
    Row
} from "react-bootstrap";
import CartItem from "./CartItem";
import {useDispatch, useSelector} from "react-redux";
import {selectCart, selectList, setEmpty} from "./redux/cartSlice";
import axios from "axios";
import Login from "./Login";
import {setId} from "./redux/userSlice";
import SuccessOrderPage from "./SuccessOrderPage";

function Cart() {
    const cart = useSelector((state) => state.cart.items);
    const user = useSelector((state) => state.user.id);
    const dispatch = useDispatch();

    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);
    const [modal, setModal] = useState(false);
    const [order, setOrder] = useState(false);
    const [messageHeader, setMessageHeader] = useState('');
    const [messageBody, setMessageBody] = useState('');
    const [state, setState] = useState(false);
    const [success, setSuccess] = useState(false);

    const orderFunction = () =>{
        if(state === true) {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                window.location.href = "/";
            }, 10000);
        }
        setOrder(false);
    }

    const cartList = (c) => {
        var listId = '';
        var listNum = '';
        for(var i = 0; i < c.length; i++){
            if(c[i].num !== 0){
                listId += c[i].id + ',';
                listNum += c[i].num + ',';
            }
        }
        return({
            id: listId,
            num: listNum,
        });
    }
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
        document.title = 'BookWorm | Cart';
    }, [cart]);

    const placeOrder = () =>{
        if(count === 0) {
            setMessageHeader("Cannot place order");
            setMessageBody("Your cart is empty!");
            setOrder(true);
        }
        else{
            if (user === -1) {
                setModal(true);
            } else {
                const link = '/api/cart?id=' + cartList(cart).id + '&num=' + cartList(cart).num;
                console.log(link);
                axios.post(link)
                    .then(response => {
                        if (response) {
                            setMessageHeader(response.data.header);
                            setMessageBody(response.data.body);
                            setOrder(true);
                            if (response.data.state === true) {
                                dispatch(setEmpty());
                                setState(true);

                            } else {
                                const errorList = response.data.error;
                                setState(false);
                                errorList.forEach(i => {
                                    dispatch(selectCart({id: i, num: 0}))
                                });
                            }
                        }
                    }).catch(error => {
                    console.log(error.response);
                });
            }
        }
    }

    useEffect(()=>{
        if(modal === false) document.title = 'BookWorm | Cart';
    },[modal]);
    return <>
        <Container>
            <Row style={{paddingLeft: '10px'}}>
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
                        <Card.Header align="center">
                                <b>
                                    Cart totals
                                </b>
                        </Card.Header>
                        <Card.Body style={{margin: '10px'}}>
                            <Row>
                                <h3 align="center">
                                    ${total}
                                </h3>
                            </Row>
                            <Row>
                                <Button type="primary" id="cart-order-button" onClick={placeOrder}> Place order</Button>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

        <Modal show={modal}
               animation={true}
               onHide={() => setModal(false)}>
            <Login setModal={setModal}/>
        </Modal>
        <Modal show={order}
               animation={true}
               onHide={orderFunction}>
            <Modal.Header>
                <Modal.Title>
                    {messageHeader}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {messageBody}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={orderFunction}>OK!</Button>
            </Modal.Footer>
        </Modal>
        <SuccessOrderPage show={success}/>
    </>
} export default Cart;
