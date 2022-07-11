import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setItem} from "./redux/cartSlice";
import {Button, Col, Form, ListGroup, Modal, Row, Toast} from "react-bootstrap";
import axios from "axios";
import "../../css/app.css"

function CartItem(props) {
    const [quantity, setQuantity] = useState(props.num);
    const [show, setShow] = useState(false);
    const [book, setBook] = useState(null);
    const [modal, setModal] = useState(false);
    const id = props.id;
    const dispatch = useDispatch();

    useEffect(() => {
        if(props.num > 0) {
            setShow(true);
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
        }
    }, []);

    const blurQuantity = (e) =>{

    }

    const changeQuantity = (e) =>{
        if (e.target.value <= 0) {
            setQuantity(0);
            setModal(true);
        } else if (e.target.value > 8) {
            setQuantity(8);
        }
        else {
            setQuantity(e.target.value);
            dispatch(setItem({id: book.id, num: e.target.value}));
        }
    }

    if (book === null || show === false) return <></>;
    else return <>
        <ListGroup.Item id="cart-item">
            <Row>
                <Col md={6}>
                    <Row>
                            <Col md={3}>
                                <a href={'/book/' + id} target="_blank">
                                <img src={require('./../../assets/bookcover/' + book.photo + '.jpg').default}
                                     className="img-fluid rounded-start" alt="book photo"/>
                                </a>
                            </Col>
                            <Col md={9} className="center-vertical">
                                <p>
                                    <a href={'/book/' + id} target="_blank">
                                        <b style={{color: 'black'}}>
                                            {book.title}
                                        </b>
                                    </a>
                                    <br/>
                                    {book.author}
                                </p>
                            </Col>
                    </Row>
                </Col>
                <Col md={2} className="center-vertical">
                    <p style={{margin: '0px'}}>
                        {
                            book.price !== null &&
                            <small>
                                <del>
                                    ${book.original_price}
                                </del>
                                <br/>
                            </small>
                        }
                        <strong>${book.price !== null ? book.price : book.original_price}</strong>
                    </p>
                </Col>
                <Col md={2} className="center-vertical">
                    <Form.Control type="number"
                                  value={quantity+""}
                                  onBlur={blurQuantity}
                                  onChange={changeQuantity}
                    />
                </Col>
                <Col md={2} className="center-vertical">
                    <strong>
                        ${((+quantity) * (book.price!==null? +book.price : +book.original_price)).toFixed(2)}
                    </strong>
                </Col>
            </Row>
        </ListGroup.Item>

        <Modal show={modal} animation={true}>
            <Modal.Header>
                <Modal.Title>Remove product from cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to remove this product from cart?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {setModal(false); setQuantity(1); dispatch(setItem({id: book.id, num: 1}));}}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => {setModal(false); setShow(false); dispatch(setItem({id: book.id, num: 0}));}}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    </>;
}export default CartItem;
