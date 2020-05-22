import React from 'react'
import Title from "../components/Detail/Title";
import Auth from "../components/Detail/Auth";
import PDF from "../components/Detail/PDF";
import { useSelector } from "react-redux";
import FeatureDocs from "../components/FeaturedCourses";
import Content from "../components/Detail/Content";
import Comment from "../components/Detail/Comment"
const Index = () => {
    const { docsList } = useSelector(state => state.Document);
    return (
        <div>
            <Title title="Bảng công thức tích phân - đạo hàm - Mũ - logarit" />
            <Auth />
            <PDF />
            <Content />
            <h2 className="gx-font-weight-bold">Bình luận</h2>
            <Comment />
            <div className="gx-mt-3"><FeatureDocs data={docsList} title={"Tài liệu liên quan"} /></div>
        </div>
    )
}
export default Index;