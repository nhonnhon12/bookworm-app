import React, {Component} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import 'antd/dist/antd.css';
import axios from "axios";

export default class CategoryFilter extends Component {
    state = {
        items: []
    }
    componentDidMount() {
        axios.get('/api/categories')
            .then(res => {
                const items = res.data;
                this.setState({ items });
            })
            .catch(error => console.log(error));
    }
    render() {
        return <>
            <Select
                showSearch
                style={{
                    width: 150,
                }}
                placeholder= "All Categories"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
            >
                <Option value="0">All Categories</Option>
                {
                    this.state.items.map(item =>
                        <Option value={item.id}>
                            {item.category_name}
                        </Option>
                    )
                }
            </Select>
        </>;
    }
}
