import React from 'react'
import { Row, Col, Icon } from "antd";

import "./style.less";
const Index = () => {
    return (
        <div className="brandcurm_box">
            <Row className=" gx-mx-5 gx-text-center gx-py-3 gx-text-white index_page">
                <Col span={8} >
                    <div className="item_index">
                        <span><Icon type="user" /></span>
                        <p className="gx-mb-0">   Trở thành thành viên</p>
                    </div>
                </Col>
                <Col span={8} >
                    <div className="item_index">
                        <span><Icon type="file-pdf" /></span>
                        <p className="gx-mb-0">   Chia sẻ <br/> tài liệu</p>
                    </div>
                </Col>  <Col span={8} >
                    <div className="item_index">
                        <span><Icon type="global" /></span>
                        <p className="gx-mb-0">  Cộng đồng Share</p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default Index;