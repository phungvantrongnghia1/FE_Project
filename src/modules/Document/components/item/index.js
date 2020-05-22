import React, { useMemo, useState } from 'react'
import { Card, Icon, Modal } from 'antd';
import UploadDoc from "components/UploadDoc";
import { Link } from "react-router-dom";
import "./style.less"
const { Meta } = Card;
const Index = (props) => {
    const { value, auth } = props;
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = e => {
        setVisible(false)
    };

    const handleCancel = e => {
        setVisible(false)
    };
    const renderItem = useMemo(() => {
        return value !== undefined ? (
            <Card className="document gx-mx-2"
                cover={
                    <Link to={`/document-detail/${value.Id}`}> <img
                        alt="example"
                        src={`${process.env.APP_URL}${JSON.parse(value.Image).url}`}
                    /></Link>

                }
                actions={!auth ? [
                    <span key="eye"><Icon type="eye" /> {value.Views}</span>,
                    <span key="download"><Icon type="download" /> {value.Dowloads}</span>,
                    <span key="share"><Icon type="share-alt" /> {value.Shares}</span>
                ] : [<Icon key="update" type="edit" onClick={showModal} />,
                <Icon key="delete" type="delete" />,
                <Icon key="share" type="share-alt" />]}
            >
                <Link to={`/document-detail/${value.Id}`}>  <Meta className="document_title"
                    title={value.Title} description={value.Content_trailer}
                /></Link>

            </Card>
        ) : <></>
    }, [value])
    return (
        <>
            {renderItem}
            <Modal
                title="Cập nhật thông tin tài liệu"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <UploadDoc data={value} />
            </Modal>
        </>
    )
}

export default Index;