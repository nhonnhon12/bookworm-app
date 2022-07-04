import React from "react";
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header";

function App() {
    return (
        <Header/>
    );
} export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
