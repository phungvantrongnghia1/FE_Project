import React, { useEffect, useMemo } from 'react';
import { Icon, Row, Col,Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Category from "../components/Category";
import FeatureDocument from "../../Document/components/FeaturedCourses";
import Document from "../../Document/pages";
import { getDocsShare } from "../redux/actions";
import DocsItem from "../../Document/components/item";
const Index = () => {
    const dispatch = useDispatch();
    const { docsShare } = useSelector(state => state.Home);
    console.log(docsShare);
    useEffect(() => {
        dispatch(getDocsShare())
    }, [])
    const renderDocsShare = useMemo(() => {
        return <Row className="gx-m-0 gx-mt-4">
            {docsShare.map((doc, index) => <Col span={6} key={index}><DocsItem value={doc} /></Col>)}
        </Row>
    }, [docsShare])
    return (
        <div>
            <FeatureDocument title="Tài liệu nổi bật" data={docsShare} />
            <h5 className="gx-py-2 gx-m-0 gx-font-weight-bold"><Icon className="gx-mr-2" type="double-right" />Tất cả tài liệu</h5>
            <Category />
            {renderDocsShare}
            <div className="gx-text-center"><Pagination defaultCurrent={1} total={50} /></div>
        </div>
    )
}
export default Index;