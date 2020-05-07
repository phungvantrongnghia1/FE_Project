import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Icon, Button, Badge } from 'antd';

import './header.less';
const { Header } = Layout;

const Index = (props) => {

  return (
    <Header
      style={{ position: 'fixed', zIndex: 999, width: '100%' }}
      className="header"
    >
      Header
    </Header>
  );
};
export default withRouter(Index);
