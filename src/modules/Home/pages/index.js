import React from 'react';
import { Icon } from "antd";
import Category from "../components/Category";
import FeatureDocument from "../../Document/components/FeaturedCourses";
import Document from "../../Document/pages"
export default function index() {
    const data = [{ title: 'a' }, { title: 'a' }, { title: 'a' }, { title: 'a' }, { title: 'a' }, { title: 'a' }, { title: 'a' }, { title: 'a' }]
    return (
        <div>
            <FeatureDocument title="Tài liệu nổi bật" data={data} />
            <h5 className="gx-py-2 gx-m-0 gx-font-weight-bold"><Icon className="gx-mr-2" type="double-right" />Tất cả tài liệu</h5>
            <Category />
            <Document />
        </div>
    )
}
