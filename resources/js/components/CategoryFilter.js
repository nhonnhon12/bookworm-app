import React, {Component, useEffect, useState} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import {Menu, Select} from "antd";
import {Option} from "antd/es/mentions";
import 'antd/dist/antd.css';
import axios from "axios";

function CategoryFilter(props){
    const [data, setData] = useState([]);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            axios.get('/api/categories')
                .then((response) => {
                    setData(response.data);
                    console.log(data);
                }).catch(error => console.log(error));
            mounted = false;
        }
    },[] );

    return <>
        <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            style={{
                width: 150,
            }}
            defaultValue= "All Categories"
            onChange={(value) => props.categoryCallback(value)}
        >
                <Select.Option key="0" value="0">All Categories</Select.Option>
                {
                    data.map(item =>
                        <Option key={item.id} value={item.id}>
                            {item.category_name}
                        </Option>
                    )
                }
        </Select>
    </>;
} export default CategoryFilter;
