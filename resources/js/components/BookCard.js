import React, {Component} from "react";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../../css/app.css'
import AuthorFilter from "./AuthorFilter";
import {Rate} from "antd";

function BookCard(props) {
    return <>
        <Card>
            <Link to={"/book/" + props.id} style={{textDecoration: 'none'}}>
                <Card.Img variant="top" src={require('./../../assets/bookcover/' + props.image + '.jpg').default}
                          id="card-img"/>
            </Link>
            <Card.Body>
                <Link to={"/book/" + props.id} style={{textDecoration: 'none'}}>
                    <Card.Title id="card-title">
                        {props.title}
                    </Card.Title>
                </Link>
                <Card.Text id="card-text">
                    {props.author}
                    <div>
                        {
                            props.rating !== null ?
                                <><Rate disabled allowHalf defaultValue={+props.rating} style={{ fontSize: '14px' }}/>
                                    &nbsp;({props.count})</>
                                 : '(No review)'
                        }

                    </div>
                </Card.Text>
            </Card.Body>
            <Card.Footer align={"center"} id="card-footer">
                {
                    props.price !== null &&
                    <small>
                        <del>
                            ${props.orginal_price}
                        </del>
                        &nbsp;&nbsp;&nbsp;
                    </small>
                }
                <strong>${props.price !== null ? props.price : props.orginal_price}</strong>
            </Card.Footer>
        </Card>
    </>

} export default BookCard;
