import React, { useMemo, useState, useRef } from 'react';
import { Card, Icon, Modal, Dropdown, message, Menu, Popconfirm, Form, Row, Col, Tag, Input, Tooltip } from 'antd';
import UploadDoc from 'components/UploadDoc';
import { Link } from 'react-router-dom';
import './style.less';
const { Meta } = Card;
const FormItem = Form.Item;

const Index = (props) => {
  const { value, auth, docsCate, deleteDocs, shareDocs, reShareDocs } = props;
  const { getFieldDecorator } = props.form;
  const [visible, setVisible] = useState(false);
  const [visibleShare, setVisibleShare] = useState(false);
  const [visibleReShare, setVisibleReShare] = useState(false);
  const saveInputRef = useRef();
  const ERR_FORM_MESSAGE = 'Require';
  const [stateTag, setStateTag] = useState({
    tags: [],
    inputVisible: false,
    inputValue: ''
  })
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    let payload = {  
      id: value.Id,
      user_Share: [...stateTag.tags]
    }
    if (visibleShare)
      shareDocs(payload);
    else
      reShareDocs(payload)
  };

  const handleCancel = (e) => {
    setVisible(false);
  };
  const handleButtonClick = (e) => {
    console.log('click left button', e);
  }
  const checkTitle = (title) => {
    let result = title;
    if (title.length > 28) {
      result = title.slice(0, 24) + "..."
    }
    return result;
  }
  const confirm = (e) => {
    deleteDocs(value.Id)
  }

  const cancel = (e) => {
    message.error('Click on No');
  }
  const handleClose = removedTag => {
    const stateTagUpdate = { ...stateTag };
    stateTagUpdate.tags = stateTag.tags.filter(tag => tag !== removedTag);
    setStateTag(stateTagUpdate);
  };
  const showInput = () => {
    const stateTagUpdate = { ...stateTag };
    stateTagUpdate.inputVisible = true;
    setStateTag(stateTagUpdate);
  };
  const handleInputChange = e => {
    const stateTagUpdate = { ...stateTag };
    stateTagUpdate.inputValue = e.target.value;
    setStateTag(stateTagUpdate);
  };
  const handleInputConfirm = () => {
    const { inputValue } = stateTag;
    let { tags } = stateTag;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    setStateTag({
      tags,
      inputVisible: false,
      inputValue: ''
    });
  };
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={showModal}>
        <Icon type="edit" />
        Cập nhật
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setVisibleShare(true)}>
        <Icon type="share-alt" />
        Chia sẽ
      </Menu.Item>
      <Menu.Item key="3">
        <Popconfirm
          title="Bạn có chất muốn xóa tài liệu này không?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        > <Icon type="delete" />
        Xóa</Popconfirm>

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
              src={JSON.parse(value.Image).url}
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
              <span key="share" onClick={() => setVisibleReShare(true)}>
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
        <UploadDoc data={value} typeAc={false} docsCate={docsCate} />
      </Modal>
      <Modal
        title="Chia sẻ tài liệu"
        visible={visibleShare || visibleReShare}
        onOk={handleOk}
        onCancel={() => {
          if (visibleShare)
            setVisibleShare(false)
          else setVisibleReShare(false)
        }}
      >
        <div>
          {stateTag.tags.map((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag key={tag} className="gx-font-weight-bold" closable={index !== 0} onClose={() => handleClose(tag)}>
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
                tagElem
              );
          })}
          {stateTag.inputVisible && (
            <Input
              ref={saveInputRef}
              type="text"
              size="small"
              style={{ width: 110 }}
              value={stateTag.inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          )}
          {!stateTag.inputVisible && (
            <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
              <Icon type="plus" /> Thêm người được chia sẽ
            </Tag>
          )}
        </div>
        <div className="gx-mt-3">
          <Card
            className="document gx-mx-2"
            style={{ width: 256 }}
            cover={
              <Link to={`/document-detail/${value.Id}`}>
                <img
                  alt="example"
                  src={JSON.parse(value.Image).url}
                />
              </Link>
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
        </div>
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

export default Form.create()(Index);
