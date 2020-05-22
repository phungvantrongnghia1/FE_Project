import React from 'react';
import { Menu, Dropdown, Icon, Avatar } from 'antd';
import PropTypes from 'prop-types';
import './styles.less';

const Index = React.memo(props => {
  const { authUser } = props;
  const menu = (
    <Menu onClick={props.handleUserMenu} className="gx-position-relative">
      <Menu.Item key="profile">
        <Icon type="profile" />
        Tài khoản
      </Menu.Item>
      <Menu.Item key="logout">
        <Icon type="logout" />
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlayClassName="vz-custom-user-profile" placement="bottomCenter" overlay={menu}>
      <a className="ant-dropdown-link user-profile-click gx-text-white" onClick={e => e.preventDefault()}>
      <Avatar icon="user"  className="gx-mr-2"/>
        {authUser.FullName} <Icon type="down" />
      </a>
    </Dropdown>
  );
});

Index.propTypes = {
  authUser: PropTypes.object.isRequired,
  handleUserMenu: PropTypes.func.isRequired
};

Index.defaultProps = {
  authUser: {}
};

export default Index;
