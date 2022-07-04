import React from 'react';
import ReactDOM from 'react-dom';
import {Nav} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function Header() {
    return (
        <>

        </>
    );
} export default Header;

if (document.getElementById('header')) {
    ReactDOM.render(<Header />, document.getElementById('header'));
}
