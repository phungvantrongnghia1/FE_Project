import React from 'react'
import { Row, Col, Avatar, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import "./style.less";
export default function Index(props) {
    const { docsDetail } = props;
    console.log('docsDetail :>> ', docsDetail);
    return (
        <Row className="gx-my-2 auth gx-mt-4">
            <Col span={18}>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <span className="gx-font-weight-bold">{Object.entries(docsDetail).length !== 0 ? docsDetail.user.FullName : ""}</span>
            </Col>
            <Col span={6} className="gx-text-right">
                {/* <Button type="primary" className=""><Icon type="download" />Tải </Button> */}
                {Object.entries(docsDetail).length !== 0 ? <Button type="primary" className=""><Icon type="download" /> <a className="gx-text-white" href={`${process.env.APP_URL}${JSON.parse(docsDetail.File).url}`}>Tải xuống</a> </Button> : <></>}
            </Col>
        </Row>
    )
}
Index.propTypes = {};
Index.defaultProps = {
    docsDetail: {
    }
}