import React, {Component} from "react";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../../css/app.css';

class CountNumberItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const per = this.props.per;
        const page = this.props.page;
        const total = this.props.total;
        const item = this.props.item;
        var start = per * page;
        var end = +start + +per;
        return <>
            {start} - {end} of {total} {item}
        </>;
    }
} export default CountNumberItem;
