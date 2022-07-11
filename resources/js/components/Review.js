import {Card, Col, ListGroup, Row} from "react-bootstrap";
import React, {useState} from "react";
import {Pagination, Rate, Select} from "antd";

function Review() {
    const [filter, setFilter] = useState('');
    return <>
        <Card>
            <Card.Header>
                <Row style={{marginTop: '10px'}}>
                    <Col md={5}>
                        <h2>
                            <strong>Customer reviews </strong>
                        </h2>
                    </Col>
                    <Col md={7} align="right">
                        <Rate value={4.5} allowHalf disabled className="center-vertical"/>
                        <strong style={{fontSize: '20px'}}> (4.5 Star)</strong>
                    </Col>
                </Row>
                <Row className="justify-content-center" style={{margin: '2px 0'}}>
                    <Col align='center'>
                        5 star (5)
                    </Col>
                    <Col align='center'>
                        4 star (5)
                    </Col>
                    <Col align='center'>
                        3 star (0)
                    </Col>
                    <Col align='center'>
                        2 star (0)
                    </Col>
                    <Col align='center'>
                        1 star (0)
                    </Col>
                    <Col align='center'>
                        <b> (10)</b>
                    </Col>
                </Row>
                <hr/>
                <Row style={{margin: '5px 0'}}>
                    <Col md={4} className="center-vertical">
                        <b>Showing 1-5 of 10 reviews</b>
                    </Col>
                    <Col md={8}>
                        <Row>
                            <Col md={6}>
                                <b>Sort: </b>
                                <Select
                                    showSearch
                                    style={{
                                        width: 150,
                                    }}
                                    defaultValue="0"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.includes(input)}
                                    onChange={(value) => props.callback(value)}
                                >
                                    <Select.Option key="0" value="0">Newest to oldest</Select.Option>
                                    <Select.Option key="1" value="1">Oldest to newest</Select.Option>
                                </Select>
                            </Col>
                            <Col md={6}>
                                <b>Paginate: </b>
                                <Select
                                    showSearch
                                    style={{
                                        width: 150,
                                    }}
                                    defaultValue="5"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.includes(input)}
                                    onChange={(value) => props.callback(value)}
                                >
                                    <Select.Option key="5" value="5">5 per page</Select.Option>
                                    <Select.Option key="15" value="15">15 per page</Select.Option>
                                    <Select.Option key="20" value="20">20 per page</Select.Option>
                                    <Select.Option key="25" value="25">25 per page</Select.Option>
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Header>
            {
                [1, 2, 3, 4, 5].map(i =>
                    <ListGroup variant="flush">
                        <ListGroup.Item id="cart-item" style={{margin: '20px 12px'}}>
                            <Row>
                                <p>
                                    <b style={{fontSize: '20px'}}>Review Title {i}</b> (5 star)
                                </p>
                            </Row>
                            <Row>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non purus vel nisi
                                    dapibus vehicula sit amet at enim. Duis ac augue non purus posuere hendrerit at quis
                                    orci.
                                </p>
                            </Row>
                            <Row>
                                <p>
                                    <small>
                                        July 11th, 2022
                                    </small>
                                </p>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                )
            }
            <Card.Footer>
                <Pagination current={1} total={10} pageSize={5} showSizeChanger={false} />
            </Card.Footer>
        </Card>
    </>;
}export default Review;
