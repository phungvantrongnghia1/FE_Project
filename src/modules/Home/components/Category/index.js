import React, { useState, useMemo } from 'react';
import { withRouter } from "react-router-dom";
import { Menu, Dropdown, Icon, Row, Col, Button } from 'antd';
import "./style.less"
const Index = (props) => {
    const [category, setCategory] = useState('Tất cả'),
        { docsCate,searchDocsFn } = props;
    const menu = useMemo(() => {
        return (
            <Menu onClick={value => { setCategory(value.key), searchDocsFn(value.item.props.value), props.history.push({ search: `?cate=${value.key}` }) }}>
                <Menu.Item key={"Tất cả"} value={"Tất cả"}>
                    Tất cả
                    </Menu.Item>
                {
                    docsCate.map(doc => (<Menu.Item key={doc.Title} value={doc.Id}>
                        {doc.Title}
                    </Menu.Item>))
                }
            </Menu>
        );
    }, [docsCate])
    const menuFile = () => (
        <Menu>

            <Menu.Item key="pdf">
                PDF
                </Menu.Item>

        </Menu>
    )
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
                    <Dropdown className="" overlay={menuFile}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            PDF <Icon type="down" />
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
export default withRouter(Index);