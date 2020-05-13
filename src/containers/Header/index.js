import React from 'react';
import { Row, Col, Button, Icon, Input } from 'antd';
import './header.less';
const { Search } = Input;

export default function index() {
  return (
    <Row className="header">
      <Col span={4} className="header_brand">
        <div className="gx-text-right">
          <Icon type="fire" className="gx-text-green gx-fs-xxxl" />
          <span className="gx-font-weight-bold gx-text-white">Share</span>
        </div>
      </Col>
      <Col span={16} className="header_nav">
        <Row>
          <Col className="left" span={14}>
            <ul className="nav gx-mb-0 gx-h-100">
              <li className="nav_item active">Home</li>
              <li className="nav_item">My Document</li>
              <li className="nav_item">Contact</li>
            </ul>
          </Col>
          <Col className="right" span={10}>
            <Search
              className="gx-mb-0"
              placeholder="Tìm kiếm tài liệu"
              onSearch={(value) => console.log(value)}
            />
          </Col>
        </Row>
      </Col>
      <Col span={4} className="header_btn">
        <Button className="gx-mb-0" type="primary">
          <Icon type="upload" /> Upload
        </Button>
        <Button className="gx-mb-0" type="danger">
          <Icon type="login" /> Login
        </Button>
      </Col>
    </Row>
  );
}
