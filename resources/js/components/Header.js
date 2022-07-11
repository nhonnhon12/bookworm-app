import React, {Component, useEffect, useState} from 'react';
import {Button, Container, Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import Login from "./Login";
import {setId, setName} from "./redux/userSlice";

function Header(){
    //redux
    const cart = useSelector((state) => state.cart.items);
    const name = useSelector((state) => state.user.name);
    const id = useSelector((state) => state.user.id);
    const dispatch = useDispatch();

    //use state
    const [count, setCount] = useState(0);
    const [modal, setModal] = useState(false);
    const [logout, setLogout] = useState(false);

    useEffect( () =>{
        //set all nav to lightgray
        document.getElementById('home').style.color = "lightgray";
        document.getElementById('shop').style.color = "lightgray";
        document.getElementById('about').style.color = "lightgray";
        document.getElementById('cart').style.color = "lightgray";

        //set choosing
        var choosing;
        if(window.location.href.toString().includes("/shop") || window.location.href.toString().includes("/book")) choosing = document.getElementById('shop');
        else if(window.location.href.toString().includes("/about")) choosing = document.getElementById('about');
        else if(window.location.href.toString().includes("/cart")) choosing = document.getElementById('cart');
        // else if(window.location.href.toString().includes("/login") || window.location.href.toString().includes("/register")) choosing = document.getElementById('login') || document.getElementById('home');
        else choosing = document.getElementById('home');
        choosing.style.fontWeight = "600";
        choosing.style.color = "white";
    }, []);

    useEffect(()=>{
        axios.post('/api/get-user')
            .then(response => {
                if (response.data) {
                    console.log(response.data);
                    dispatch(setId(response.data.userId));
                    dispatch(setName(response.data.first + " " + response.data.last));
                }
                else dispatch(setId(-1));
            }).catch(error => {
            console.log(error);
        });
    }, [id]);

    useEffect(() => {
        var c = 0;
        for(var i = 0; i < cart.length; i++){
            if(cart[i].num !== 0) {
                c += +cart[i].num;
            }
        }
        setCount(c);
    }, [cart]);

    const logoutFunction = () =>{
        axios.post('/api/logout')
            .then(response => {
                console.log(response);
                setLogout(true);
                dispatch(setId(-1));
            }).catch(error => {
            console.log(error);
        });
    }

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
                        {
                            id === -1 ?
                                <Nav.Link href="#" onSelect={() => setModal(true)} id='login'>Login</Nav.Link>
                                :   <NavDropdown title={name} id="logout">
                                        <NavDropdown.Item onClick={logoutFunction}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Modal show={modal}
               animation={true}
               onHide={() => {
                   setModal(false);
               }}>
            <Login setModal={setModal}/>
        </Modal>

        <Modal show={logout}
               animation={true}
               onHide={() => {
                   setLogout(false);
               }}>
            <Modal.Header>
                <Modal.Title>Logout successfully!</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="primary" onClick={()=>setLogout(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>;
} export default Header;
