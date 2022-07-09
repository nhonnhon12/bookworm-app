import React, {Component, useEffect, useState} from 'react';
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

function queryBuilder(props) { //build query for api
    var q = '?';
    props.author != 0 ? q += '&author=' + props.author: 1;
    props.category != 0 ? q += '&category=' + props.category: 1;
    props.rating != 0 ? q += '&rating=' + props.rating: 1;
    switch (props._sort){
        case 'sale': q += '&sort=' + props._sort; break;
        case 'popularity': q += '&sort=' + props._sort; break;
        default: q += '&sort=' + props._sort;
    }
    //props._sort !== 0 ? q += '&sort=' + props._sort: 1;
    props.paginate !== 0 ? q += '&paginate=' + props.paginate: 1;
    props.page !==0 ? q+= '&page=' + props.page: 1;
    return q;
}

function GetBookShop(props){
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            let link = '/api/books' + queryBuilder(props.query);
            // console.log(link);
            axios.get(link)
                .then(res => {
                    setList(res.data.data);
                    setTotal(res.data.total);
                })
                .catch(error => console.log(error));
            mounted = false;
        }
    },[props] );

    useEffect(()=>{
        props.callback(total);
        console.log(total+" t");
    }, [total]);


    //show list of book in shop page (5 books per rows)
    return <>
        <Container style={{padding: "0px 0px"}}>
            <Row xs={2} lg={5} className="g-4">
                {
                    list.map(book =>
                        <Col className="book-card">
                            <BookCard id={book.id} title={book.title} author={book.author}
                                      orginal_price={book.original_price} price={book.price}
                                      image={book.photo} rating={book.rating} count = {book.count}/>
                        </Col>)
                }
            </Row>
        </Container>
    </>;
} export default GetBookShop;

