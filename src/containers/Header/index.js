import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Button, Icon, Input, Modal } from 'antd';
import UploadDoc from "components/UploadDoc";
import BrandCurm from "./components/Breadcurm";
import './header.less';
const { Search } = Input;

export default function Index() {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = e => {
    setVisible(false)
  };

  const handleCancel = e => {
    setVisible(false)
  };
  return (
    <>
      <Row className="header">
        <Col span={4} className="header_brand">
          <div className="gx-text-right">
            <Link to="/"><Icon type="fire" className="gx-text-green gx-fs-xxxl" />
              <span className="gx-font-weight-bold gx-text-white">Share</span></Link>
          </div>
        </Col>
        <Col span={16} className="header_nav">
          <Row>
            <Col className="left" span={14}>
              <ul className="nav gx-mb-0 gx-h-100">
                <li className="nav_item active">Trang chủ</li>
                <li className="nav_item">Tài liệu</li>
                <li className="nav_item">Liên Hệ</li>
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
          <Button className="gx-mb-0" type="primary" onClick={showModal}>
            <Icon type="upload" /> Tải lên
        </Button>
          <Button className="gx-mb-0" type="danger">
            <Icon type="login" /> Đăng nhập
        </Button>
        </Col>
      </Row>
      <BrandCurm />

      <Modal
        title="Tải tài liệu lên"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <UploadDoc />
      </Modal>
    </>
  );
}
