import React from 'react';
import Item from "../components/item";
import { Row, Col, Pagination } from "antd";
export default function index() {
    return (
        <>
            <Row className="gx-m-0 gx-mt-4">
                <Col span={6}><Item /></Col>
                <Col span={6}><Item /></Col>
                <Col span={6}><Item /></Col>
                <Col span={6}><Item /></Col>
            </Row>
            <div className="gx-text-center"><Pagination defaultCurrent={1} total={50} /></div>
        </>
    )
}
