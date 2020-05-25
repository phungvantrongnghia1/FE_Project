import React, { useMemo, useState } from 'react';
import { Card, Icon, Modal, Dropdown, message, Menu } from 'antd';
import UploadDoc from 'components/UploadDoc';
import { Link } from 'react-router-dom';
import './style.less';
const { Meta } = Card;
const Index = (props) => {
  const { value, auth ,docsCate } = props;
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };
  function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }
  const checkTitle = (title) => {
    let result = title;
    if(title.length > 28){
      result = title.slice(0,24) + "..."
    }
    return result;
  }
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={showModal}>
        <Icon type="edit" />
        Cập nhật
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="share-alt" />
        Chia sẽ
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="delete" />
        Xóa
      </Menu.Item>
    </Menu>
  );
  const renderItem = useMemo(() => {
    return value !== undefined ? (
      <Card
        className="document gx-mx-2"
        cover={
          <Link to={`/document-detail/${value.Id}`}>
            <img
              alt="example"
              src={`${process.env.APP_URL}${JSON.parse(value.Image).url}`}
            />
          </Link>
        }
        actions={
          !auth ? (
            [
              <span key="eye">
                <Icon type="eye" /> {value.Views}
              </span>,
              <span key="download">
                <Icon type="download" /> {value.Dowloads}
              </span>,
              <span key="share">
                <Icon type="share-alt" /> {value.Shares}
              </span>
            ]
          ) : (
            <></>
          )
        }
      >
        <Link to={`/document-detail/${value.Id}`}>
          <Meta
            className="document_title"
            title={value.Title}
            description={checkTitle(value.Content_trailer)}
          />
        </Link>
      </Card>
    ) : (
      <></>
    );
  }, [value]);
  return (
    <div className="box_document">
      {renderItem}
      <Modal
        title="Cập nhật thông tin tài liệu"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <UploadDoc data={value} typeAc={false} docsCate={docsCate}/>
      </Modal>
      {auth ? (
        <div className="dropdown">
          <Dropdown.Button
            onClick={handleButtonClick}
            overlay={menu}
            icon={<Icon type="more" />}
          ></Dropdown.Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Index;
