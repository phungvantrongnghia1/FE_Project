import React from 'react'
import Title from "../components/Detail/Title";
import Auth from "../components/Detail/Auth";
import PDF from "../components/Detail/PDF";
import FeatureDocs from "../components/FeaturedCourses";
import Content from "../components/Detail/Content";
const Index = () => {
    const data = [{ title: 'a' }, { title: 'a' }, { title: 'a' }, { title: 'a' }, { title: 'a' }, { title: 'a' }, { title: 'a' }, { title: 'a' }]
    return (
        <div>
            <Title title="Bảng công thức tích phân - đạo hàm - Mũ - logarit" />
            <Auth />
            <PDF />
            <Content />
            <div className="gx-mt-3"><FeatureDocs title={"Tài liệu liên quan"} data={data} /></div>
        </div>
    )
}
export default Index;