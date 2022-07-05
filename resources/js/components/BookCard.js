import React, {Component} from "react";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../../css/app.css'
import {hide} from "@popperjs/core";

const styles = {
    cardImage: {
        objectFit: 'cover',
        width: '100%',
        height: '20vw'
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
                        <Card.Title numberOfLines={2} ellipsizeMode='tail'>
                            <Link to={"/books/"+this.props.id} style={{ textDecoration: 'none' }}>
                                {this.props.title}
                            </Link>
                        </Card.Title>
                        <Card.Text>
                            {this.props.author}
                        </Card.Text>
                    </Card.Body>
                    <Card.Header align={"center"}>
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
                    </Card.Header>
            </Card>
        </>
    }
}
