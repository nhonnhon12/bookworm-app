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

const footerStyle = {
    display: 'flex',
    margin: 'auto',
    justifyContent: 'center',
}

function App() {
    return (
        <>
            <Header/>
            <div style={{ minHeight: screen.height - 120 }}>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route path="/shop" element={<Shop/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/" element={<Error/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
            <Footer style={{position: "absolute", bottom: "0"}}/>
        </>
    );
} export default App;

ReactDOM.render(<App />, document.getElementById('app'));
