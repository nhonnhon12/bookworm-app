import React, {Component} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function Header(){
    // var choosing = null;
    // if(window.location.href.toString().includes("/shop")) choosing = document.getElementById('shop').style.fontWeight = "600";
    // else if(window.location.href.toString().includes("/about")) choosing = document.getElementById('about').style.fontWeight = 'bold';
    // else if(window.location.href.toString().includes("/cart")) choosing = document.getElementById('cart').style.fontWeight = 'bold';
    // else if(window.location.href.toString().includes("/login")) choosing = document.getElementById('login').style.fontWeight = 'bold';
    // else choosing = document.getElementById('home').style.fontWeight = 'bold';
    // choosing.style.fontWeight = "600";

    return <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt="bookworm-logo"
                        src="https://v5.bootcss.com/docs/5.1/assets/brand/bootstrap-logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    BookWorm
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" id = 'home'>Home</Nav.Link>
                        <Nav.Link href="/shop" id = 'shop'>Shop</Nav.Link>
                        <Nav.Link href="/about" id = 'about'>About</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/cart" id = 'cart'>Cart</Nav.Link>
                        <Nav.Link href="/login" id = 'login'>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>;
} export default Header;
