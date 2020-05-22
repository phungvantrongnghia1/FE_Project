import React, { useEffect, useMemo } from 'react';
import Item from "../components/item";
import { Row, Col, Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getDocs } from "../redux/actions";
const Index = () => {
    const dispatch = useDispatch();
    const { docsList } = useSelector(state => state.Document);
    console.log(docsList);
    useEffect(() => {
        dispatch(getDocs())
    }, [])
    const renderDocsShare = useMemo(() => {
        return <Row className="gx-m-0 gx-mt-4">
            {docsList.map((doc, index) => <Col span={6} key={index}><Item auth={true} value={doc} /></Col>)}
        </Row>
    }, [docsList])
    return (
        <>
            {renderDocsShare}
            <div className="gx-text-center"><Pagination defaultCurrent={1} total={50} /></div>
        </>
    )
}
export default Index;