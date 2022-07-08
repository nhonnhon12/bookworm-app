import {Card, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import '../../css/app.css'

function BookDetail(props){
    const [book, setBook] = useState(null);

    let id = useParams().id;
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const link = '/api/books/' + id;
            axios.get(link)
                .then(res => {
                    setBook(res.data);
                    console.log(res.data);
                })
                .catch(error => console.log(error));
            mounted = false;
        }
    },[] );

    if(book !== null) return<>
        <Container>
            <Row style={{paddingTop: '40px', paddingLeft: '10px'}}>
                <h2><b>{book.category}</b></h2>
            </Row>
            <Row>
                <Col lg={9} sm={12} id="book-detail">
                    <Row>
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
                <Col lg={3} sm={12}>
                    Cart Control
                </Col>
            </Row>

        </Container>
    </>
    else return <></>;
}export default BookDetail;
