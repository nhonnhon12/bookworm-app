import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCart} from "./redux/cartSlice";
import {Col, Row} from "react-bootstrap";
import axios from "axios";
import "../../css/app.css"

function CartItem(props){
    const [quantity, setQuantity] = useState(props.num);
    const [cart, setCard] = useState(useSelector(selectCart));
    const id = props.id;
    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    const [book, setBook] = useState(null)

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
    },[] );

    useEffect(()=>{
        if(quantity === 0) setShow(false);
        else setShow(true);
    }, [quantity]);

    if(book===null || show===false) return <></>;
    else return <>
        <Row id="cart-item">
            <Col md={8}>
                <Row>
                    <Col md={2}>
                        <img src={require('./../../assets/bookcover/' + book.photo + '.jpg').default} className="img-fluid rounded-start" alt="book photo"/>
                    </Col>
                    <Col md={10}>
                        {book.title}
                        <br/>
                        {book.author}
                    </Col>
                </Row>
            </Col>
            <Col md={1}>

            </Col>
            <Col md={2}>

            </Col>
            <Col md={1}>

            </Col>
        </Row>
    </>;
}export default CartItem;
