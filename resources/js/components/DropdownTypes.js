import React, {Component} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import 'antd/dist/antd.css';
import axios from "axios";
import StarRatings from "react-star-ratings/build/star-ratings";

export default class DropdownTypes extends Component {
    render() {
        switch(this.props.type){
            case 'rating':
                return <>
                    <Select
                        showSearch
                        style={{
                            width: 150,
                        }}
                        placeholder= "All Rating"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                        <Option value="0">All Rating</Option>
                        <Option value="1">Above 1 stars</Option>
                        <Option value="2">Above 2 stars</Option>
                        <Option value="3">Above 3 stars</Option>
                        <Option value="4">Above 4 stars</Option>
                        <Option value="2">Above 5 stars</Option>
                    </Select>
                </>;
            case 'sort':
                return <>
                    <Select
                        showSearch
                        style={{
                            width: 150,
                        }}
                        placeholder= "Price Up"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                        <Option value="0">Price Up</Option>
                        <Option value="1">Price Down</Option>
                        <Option value="2">On-sale</Option>
                        <Option value="3">Popularity</Option>
                    </Select>
                </>;
            case 'paginate':
                return <>
                    <Select
                        showSearch
                        style={{
                            width: 150,
                        }}
                        placeholder= "5 per page"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                        <Option value="1">5 per page</Option>
                        <Option value="2">15 per page</Option>
                        <Option value="3">20 per page</Option>
                        <Option value="4">25 per page</Option>
                    </Select>
                </>;
            default:
                return <></>;
        }

    }
}
