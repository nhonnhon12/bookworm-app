import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, BrowserRouter, Routes, Navigate} from 'react-router-dom'
import Header from "./components/Header";
import {Container} from "react-bootstrap";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Shop from "./components/Shop";
import About from "./components/About";
import Error from "./components/Error";


export default class App extends Component {
    render() {
        return (
            <>
                <Header/>
                <Container>
                    <BrowserRouter>
                        <Routes>
                            <Route exact path="/" element={<Home/>}/>
                            <Route path="/shop" element={<Shop/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/cart" element={<Cart/>}/>
                            <Route path="/" element={<Error/>}/>
                        </Routes>
                    </BrowserRouter>
                    <Footer/>
                </Container>
            </>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
