import React from 'react'
import { Card } from "antd";
export default function Index(props) {
    const {docsDetail} = props;
    return (
        <div>
            <h1 className="gx-font-weight-bold gx-mt-4 gx-mb-2">Thông tin tài liệu</h1>
            <Card>
                <p>Ngày đăng: {docsDetail.DateCreaated}</p>
                <p>{docsDetail.Content_trailer}</p>
            </Card>
        </div>
    )
}
