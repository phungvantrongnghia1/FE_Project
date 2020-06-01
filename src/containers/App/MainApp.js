import React from 'react';
import { Layout, Row, Col } from 'antd';
import AppRoute from 'routes'
import Header from '../Header';
import Footer from '../Footer';
import './app.less';

const { Content } = Layout;
const MainApp = props => {
  return (
    <Layout className="gx-app-layout set-layout">
      <Header />
      <Content className="gx-layout-content gx-bg-white" style={{ padding: '0 150px' }}>
        <AppRoute match={props.match} />
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainApp;
