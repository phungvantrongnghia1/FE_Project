import React from 'react'
import { Row, Col, Avatar, Button,Icon } from 'antd';
import "./style.less";
export default function index() {
    return (
        <Row className="gx-my-2 auth gx-mt-4">
            <Col span={18}>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <span className="gx-font-weight-bold">Trọng Nghĩa</span>
            </Col>
            <Col span={6} className="gx-text-right">
                <Button type="primary" className=""><Icon type="download"/>Tải xuống</Button>
            </Col>
        </Row>
    )
}
