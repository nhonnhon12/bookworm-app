import React, {Component, useEffect, useState} from "react";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../../css/app.css';

function CountNumberItem(props) {
    const [per, setPer] = useState(props.paginate);
    const [page, setPage] = useState(props.page);
    const [total, setTotal] = useState(props.total);
    const [item, setItem] = useState(props.item);

    useEffect(() => {
        setPer(props.paginate);
        setPage(props.page);
        setTotal(props.total);
        setItem(props.item);
    }, [props.paginate, props.page, props.total, props.item]);
    return <>
        {+per * (+page - 1) +1} - {(+per * +page) > total? total : (+per * +page) } of {total} {item}
    </>;

} export default CountNumberItem;
