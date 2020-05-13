import React, { useState } from 'react'
import { Menu, Dropdown, Icon, Row, Col, Button } from 'antd';
import "./style.less"
const Index = () => {
    const [category, setCategory] = useState('Tất cả')
    const menu = (
        <Menu onClick={value => setCategory(value.key)}>
            <Menu.Item key="1st">
                1st menu item
            </Menu.Item>
            <Menu.Item key="2st">
                2nd menu item
            </Menu.Item>
            <Menu.Item key="3st">
                3rd menu item
            </Menu.Item>
        </Menu>
    );

    return (
        <Row className="category gx-bg-white gx-m-0">
            <Col span={18} className=" category_dropdown centered">
                <div className="dropdown_box">
                    <span className="gx-mr-2">Thể loại:</span>
                    <Dropdown className="gx-mr-3" overlay={menu}>
                        <a className="ant-dropdown-link">
                            {category} <Icon type="down" />
                        </a>
                    </Dropdown>
                </div>
                <div className="dropdown_box">
                    <span className="gx-mr-2">Loại file:</span>
                    <Dropdown className="" overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Hover me <Icon type="down" />
                        </a>
                    </Dropdown>
                </div>
            </Col>
            <Col span={6} className="gx-text-right  category_btn centered">
                <Button className="gx-m-0 " type="dashed"><Icon type="unordered-list" /></Button>
                <Button className="gx-m-0 " type="dashed"><Icon type="appstore" /></Button>
            </Col>
        </Row>
    )
}
export default Index;