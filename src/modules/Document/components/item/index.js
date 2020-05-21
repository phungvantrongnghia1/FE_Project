import React, { useMemo } from 'react'
import { Card, Icon, Avatar } from 'antd';
import { Link } from "react-router-dom";
import "./style.less"
const { Meta } = Card;
const Index = (props) => {
    const { value } = props;
    console.log(value);
    const renderItem = useMemo(() => {
        return value !== undefined ? (<Link to={`/document-detail/${value.Id}`}>
            <Card className="document gx-mx-2"
                cover={
                    <img
                        alt="example"
                        src={`${process.env.APP_URL}${JSON.parse(value.Image).url}`}
                    />
                }
            // actions={[
            //     <Icon type="file" key="setting" />,
            //     <Icon type="edit" key="edit" />,
            //     <Icon type="ellipsis" key="ellipsis" />
            // ]}
            >
                <Meta className="document_title"
                    title={value.Title} description={value.Content_trailer}
                />  
               
                <div className="document_icon gx-mt-4">
                    <span><Icon type="eye" /> {value.Views}</span>
                    <span><Icon type="download" /> {value.Dowloads}</span>
                    <span><Icon type="share-alt" /> {value.Shares}</span>
                </div>
            </Card>
        </Link>) : <></>
    }, [value])
    return (
        <>
            {renderItem}
        </>
    )
}

export default Index;