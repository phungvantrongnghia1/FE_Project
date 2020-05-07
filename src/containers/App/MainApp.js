import React from 'react';
import { Layout,Row,Col } from 'antd';

import Header from '../Header';
import Footer from '../Footer';
import './app.less';

const { Content } = Layout;
const MainApp = props => {
  return (
    <Layout className="gx-app-layout set-layout">
      <Header />
      <Content className="gx-layout-content" style={{ marginTop: '80px' }}>
          <Row>
            <Col span={10}>3213</Col>
            <Col span={10}>321</Col>
          </Row>
        <Footer />
      </Content>
    </Layout>
  );
};

export default MainApp;
