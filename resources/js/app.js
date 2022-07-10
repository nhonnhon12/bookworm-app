import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Index from "./components";
import {Provider} from "react-redux";
import store from './components/redux/store';

ReactDOM.render(
    <Provider store={store}>
        <Index/>
    </Provider>
    , document.getElementById('app'));


