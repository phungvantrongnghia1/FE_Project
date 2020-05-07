import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Icon, Button, Badge, Row, Col } from 'antd';

import './header.less';
const { Header } = Layout;

const Index = (props) => {
  const indicator = document.querySelector('.nav-indicator');
  const items = document.querySelectorAll('.nav-item');

  function handleIndicator(el) {
    items.forEach((item) => {
      item.classList.remove('is-active');
      item.removeAttribute('style');
    });

    indicator.style.width = `${el.offsetWidth}px`;
    indicator.style.left = `${el.offsetLeft}px`;
    indicator.style.backgroundColor = el.getAttribute('active-color');

    el.classList.add('is-active');
    el.style.color = el.getAttribute('active-color');
  }

  items.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      handleIndicator(e.target);
    });
    item.classList.contains('is-active') && handleIndicator(item);
  });
  return (
    <Header
      style={{ position: 'fixed', zIndex: 999, width: '100%' }}
      className="header"
    >
      <Row className="gx-w-100">
        <Col span={21} className="nav-col-1">
          <nav className="nav">
            <a href="#" className="nav-item is-active" active-color="orange">
              Home
            </a>
            <a href="#" className="nav-item" active-color="green">
              About
            </a>
            <a href="#" className="nav-item" active-color="blue">
              Testimonials
            </a>
            <a href="#" className="nav-item" active-color="red">
              Blog
            </a>
            <a href="#" className="nav-item" active-color="rebeccapurple">
              Contact
            </a>
            <span className="nav-indicator"></span>
          </nav>
        </Col>
        <Col span={3}>
          <span className="nv">
            <a href="#" className="nav-item nav-col-2" active-color="blue">
              Login
            </a>
          </span>
        </Col>
      </Row>
    </Header>
  );
};
export default withRouter(Index);
