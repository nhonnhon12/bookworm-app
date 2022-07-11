import React, { Component } from 'react';
import { Route, Link, BrowserRouter, Routes } from 'react-router-dom'
import {Container} from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Shop from "./Shop";
import About from "./About";
import Cart from "./Cart";
import BookDetail from "./BookDetail";
import Login from "./Login";
import Register from "./Register";
import ErrorPage from "./ErrorPage";

function Index() {
    return (
        <>
            <div style={{minHeight: '75vh'}}>
                <Header/>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route path="/shop" element={<Shop/>}/>
                        <Route path="/shop:sort" element={<Shop/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/book/:id" element={<BookDetail/>}/>
                        <Route path="*" element={<ErrorPage/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
            <Footer/>
        </>
    );
} export default Index;
