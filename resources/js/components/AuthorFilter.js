import React, {Component, useEffect, useState} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import 'antd/dist/antd.css';
import axios from "axios";

function AuthorFilter() {
    const [data, setData] = useState([]);

    function handleChange(value){
        console.log(value);
    }

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            axios.get('/api/authors')
                .then((response) => {
                    setData(response.data);
                }).catch(error => console.log(error));
            mounted = false;
        }
    },[] );

    return <>
        <Select
            showSearch
            optionFilterProp="children"
            style={{
                width: 150,
            }}
            defaultValue= "All Authors"
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            onChange={handleChange}
        >
            <Select.Option key="0" value="0">All Authors</Select.Option>
            {
                data.map(i =>
                    <Select.Option key={i.id} value={i.id}>
                        {i.author_name}
                    </Select.Option>
                )
            }
        </Select>
        </>;
} export default AuthorFilter;
