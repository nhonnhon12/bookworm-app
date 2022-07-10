import React, {Component} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import 'antd/dist/antd.css';
import axios from "axios";
import StarRatings from "react-star-ratings/build/star-ratings";

function DropdownTypes(props) {
    switch (props.type) {
        case 'rating':
            return <>
                <Select
                    showSearch
                    style={{
                        width: 150,
                    }}
                    defaultValue="All Rating"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.includes(input)}
                    // filterSort={(optionA, optionB) =>
                    //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    // }
                    onChange={(value) => props.callback(value)}
                >
                    <Select.Option key="0" value="0">All Rating</Select.Option>
                    <Select.Option key="1" value="1">Above 1 stars</Select.Option>
                    <Select.Option key="2" value="2">Above 2 stars</Select.Option>
                    <Select.Option key="3" value="3">Above 3 stars</Select.Option>
                    <Select.Option key="4" value="4">Above 4 stars</Select.Option>
                    <Select.Option key="5" value="5">Above 5 stars</Select.Option>
                </Select>
            </>;
        case 'sort':
            return <>
                <Select
                    showSearch
                    style={{
                        width: 150,
                    }}
                    defaultValue="Price Up"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.includes(input)}
                    // filterSort={(optionA, optionB) =>
                    //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    // }
                    onChange={(value) => props.callback(value)}
                >
                    <Select.Option key="1" value="price-asc">Price Up</Select.Option>
                    <Select.Option key="2" value="price-desc">Price Down</Select.Option>
                    <Select.Option key="3" value="sale">On-sale</Select.Option>
                    <Select.Option key="4" value="popularity">Popularity</Select.Option>
                </Select>
            </>;
        case 'paginate':
            return <>
                <Select
                    showSearch
                    style={{
                        width: 150,
                    }}
                    defaultValue="05 per page"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.includes(input)}
                    // filterSort={(optionA, optionB) =>
                    //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    // }
                    onChange={(value) => props.callback(value)}
                >
                    <Select.Option key="1" value="5">5 per page</Select.Option>
                    <Select.Option key="2" value="15">15 per page</Select.Option>
                    <Select.Option key="3" value="20">20 per page</Select.Option>
                    <Select.Option key="4" value="25">25 per page</Select.Option>
                </Select>
            </>;
        default:
            return <></>;
    }
} export default DropdownTypes;
