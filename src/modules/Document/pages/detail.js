import React, { useEffect, useMemo } from 'react'
import Title from "../components/Detail/Title";
import Auth from "../components/Detail/Auth";
import PDF from "../components/Detail/PDF";
import { useSelector, useDispatch } from "react-redux";
import FeatureDocs from "../components/FeaturedCourses";
import Content from "../components/Detail/Content";
import Comment from "../components/Detail/Comment";
import { getDocsDetail } from "../redux/actions";
const Index = (props) => {
    const { docsList, docsDetail } = useSelector(state => state.Document);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            getDocsDetail(props.match.params.id))
    }, [])
    const renderPDF = useMemo(() => {
        if (Object.entries(docsDetail).length !== 0)
            return <PDF url={JSON.parse(docsDetail.File).url} />
        return <></>
    }, [docsDetail])
    return (
        <div className="gx-mt-3">
            <Title title={docsDetail.Title} />
            <Auth docsDetail={docsDetail} />
            {renderPDF}
            <Content docsDetail={docsDetail} />
            <h2 className="gx-font-weight-bold">Bình luận</h2>
            <Comment />
            <div className="gx-mt-3"><FeatureDocs data={docsList} title={"Tài liệu liên quan"} /></div>
        </div>
    )
}
export default Index;