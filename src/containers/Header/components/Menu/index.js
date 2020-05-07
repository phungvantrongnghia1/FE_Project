import React, { useMemo } from 'react';
import { Dropdown, Icon, Menu } from 'antd';
import PropTypes from 'prop-types';
import './styles.less';

const Index = React.memo((props) => {
  const { source } = props;

  const showMenu = (data) => {
      let result = [];
      if (data.length > 0) {
        result = source.map((cateParent, index) => {
          if (cateParent.childrens) {
            return (
              <Menu.SubMenu
                key={index}
                title={cateParent.title}
                popupClassName="header-menu"
              >
                {cateParent.childrens.map((child, indexChild) => (
                  <Menu.Item key={indexChild}>
                    <a href={child.url}>{child.title}</a>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            );
          } else {
            return (
              <Menu.Item key={index}>
                <a href={cateParent.url}>{cateParent.title}</a>
              </Menu.Item>
            );
          }
        });
      }
      return <Menu>{result}</Menu>;
    },
    elmMenu = useMemo(() => showMenu(source), [source]);

  return (
    <Dropdown overlay={elmMenu} overlayClassName="header-menu ">
      <div
        className="mobile-hidden ant-dropdown-link gx-font-weight-medium gx-pointer gx-ml-4 gx-border gx-text-success vz-custom-menu"
        href="#"
      >
        <span className="gx-ml-3 gx-border-right gx-pr-2 gx-font-weight-semi-bold">
          Danh mục
        </span>
        <Icon className="gx-mx-2" type="down" />
      </div>
    </Dropdown>
  );
});

Index.propTypes = {
  source: PropTypes.array.isRequired
};

Index.defaultProps = {
  source: []
};

export default Index;
