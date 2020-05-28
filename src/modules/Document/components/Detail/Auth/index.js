import React from 'react'
import { Row, Col, Avatar, Button,Icon } from 'antd';
import "./style.less";
export default function Index(props) {
    const {user} = props;
    console.log('user :>> ', user);
    return (
        <Row className="gx-my-2 auth gx-mt-4">
            <Col span={18}>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <span className="gx-font-weight-bold">{Object.entries(user).length !== 0 ? user.FullName : ""}</span>
            </Col>
            <Col span={6} className="gx-text-right">
                <Button type="primary" className=""><Icon type="download"/>Tải xuống</Button>
            </Col>
        </Row>
    )
}
Index.propTypes = {};
Index.defaultProps = {
    user:{}
}