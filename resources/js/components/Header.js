import React, {Component, useEffect, useState} from 'react';
import {Container, Modal, Nav, Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import {useSelector} from "react-redux";
import Login from "./Login";

function Header(){
    const cart = useSelector((state) => state.cart.items);
    const [count, setCount] = useState(0);
    const [modal, setModal] = useState(false);

    useEffect( () =>{
        document.getElementById('home').style.color = "lightgray";
        document.getElementById('shop').style.color = "lightgray";
        document.getElementById('about').style.color = "lightgray";
        document.getElementById('cart').style.color = "lightgray";
        document.getElementById('login').style.color = "lightgray";

        var choosing;
        if(window.location.href.toString().includes("/shop") || window.location.href.toString().includes("/book")) choosing = document.getElementById('shop');
        else if(window.location.href.toString().includes("/about")) choosing = document.getElementById('about');
        else if(window.location.href.toString().includes("/cart")) choosing = document.getElementById('cart');
        else if(window.location.href.toString().includes("/login") || window.location.href.toString().includes("/register")) choosing = document.getElementById('login');
        else choosing = document.getElementById('home');
        choosing.style.fontWeight = "600";
        choosing.style.color = "white";
    }, []);

    useEffect(() => {
        var c = 0;
        for(var i = 0; i < cart.length; i++){
            if(cart[i].num !== 0) {
                c += +cart[i].num;
            }
        }
        setCount(c);
    }, [cart]);

    return <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{marginBottom: '30px'}}>
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
                        <Nav.Link href="/cart" id = 'cart'>Cart ({count})</Nav.Link>
                        <Nav.Link href="#" onSelect={() => setModal(true)} id = 'login'>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Modal show={modal}
               animation={true}
               onHide={() => {
                   setModal(false);
               }}>
            <Login/>
        </Modal>
    </>;
} export default Header;
