import React, {Component} from "react";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../../css/app.css'
import StarRatings from "react-star-ratings/build/star-ratings";
import AuthorFilter from "./AuthorFilter";

const styles = {
    cardImage: {
        objectFit: 'cover',
        width: '100%',
        height: '30vh',
    },
    card:{
        // margin: '0.2vw'
    }
}

export default class BookCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <>
            <Card style={styles.card}>
                    <Link to={"/books/"+this.props.id} style={{ textDecoration: 'none' }}>
                        <Card.Img variant="top" src={require('./../../assets/bookcover/' + this.props.image + '.jpg').default} style={styles.cardImage}/>
                    </Link>
                    <Card.Body>
                        <Card.Title className="card-title">
                            <Link to={"/books/"+this.props.id} style={{ textDecoration: 'none' }}>
                                {this.props.title}
                            </Link>
                        </Card.Title>
                        <Card.Text className="card-text">
                            {this.props.author}
                            <div>
                                {
                                    this.props.rating !== null ?
                                    <StarRatings
                                        rating={+this.props.rating}
                                        starDimension="14px"
                                        starSpacing="1px"
                                    /> : '(No review)'
                                }

                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer align={"center"} className="card-footer">
                        {
                            this.props.price !== null &&
                                <small>
                                    <del>
                                        ${this.props.orginal_price}
                                    </del>
                                    &nbsp;&nbsp;&nbsp;
                                </small>
                        }
                        <strong>${this.props.price !== null ? this.props.price : this.props.orginal_price}</strong>
                    </Card.Footer>
            </Card>
        </>
    }
}
