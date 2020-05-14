import React from 'react'
import { Card, Icon, Avatar } from 'antd';
import "./style.less"
const { Meta } = Card;
const Index = () => {
    return (
        <Card className="document gx-mx-2"
            cover={
                <img
                    alt="example"
                    src="https://tailieu.vn/image/gdoc/4410_1565229872.jpg"
                />
            }
        // actions={[
        //     <Icon type="file" key="setting" />,
        //     <Icon type="edit" key="edit" />,
        //     <Icon type="ellipsis" key="ellipsis" />
        // ]}
        >
            <Meta className="document_title"
                title="Card title"
            />
            <div className="document_icon gx-mt-4">
                <span><Icon type="eye" /> 500</span>
                <span><Icon type="download" /> 100</span>
                <span><Icon type="share-alt" /> 20</span>
            </div>
        </Card>
    )
}

export default Index;