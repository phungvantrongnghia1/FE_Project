import React, { useState, useRef } from 'react';
import moment from 'moment';
import { Avatar, Col, Icon } from 'antd';
import FileUpload from 'components/FileUpload';
import AvatarEditor from './Edit/Avatar';
import Edit from './Edit';

const gender = {
  male: 'Nam',
  female: 'Nữ'
};

const Item = (props) => {
  console.log('props', props)
  return (
    <div className={`${props.marginTop ? 'gx-mt-3' : 'gx-mt-1'} gx-flex-row`}>
      <Col span={24}>
        <span className="gx-fs-sm" style={{ color: '#404272' }}>
          {props.title}
        </span>
        <span
          className="gx-fs-sm gx-pl-1 gx-font-weight-bold"
          style={{ color: '#404272', wordBreak: 'break-word' }}
        >
          {props.value}
        </span>
      </Col>
    </div>
  );
};

const Index = React.memo((props) => {
  const { authUser } = props;
  console.log('props au', authUser)
  const [visibleEdit, setVisibleEdit] = useState(false),
    [fileUpload, setFileUpload] = useState(null),
    [visibleUpload, setVisibleUpload] = useState(false),
    refFileUpload = useRef();

  const onSetVisibleEdit = (boolean) => setVisibleEdit(boolean);

  const _onShowUpload = (file) => {
    setFileUpload(file);
    setVisibleUpload(true);
  };

  const _onHideUpload = () => setVisibleUpload(false);

  return (
    <div className="gx-py-2" style={{ width: '100%', backgroundColor: '#FFF' }}>
      <div className="gx-pt-3 gx-d-flex gx-align-items-center gx-flex-column">
        <div className="profile-avatar gx-position-relative">
          <Avatar size={120} src={authUser.image && authUser.image} />
          <FileUpload
            ref={refFileUpload}
            cbOnChange={(file) => _onShowUpload(file)}
            actCreate={true}
            buttonClick={
              <Icon
                className="icon-upload-avatar"
                theme="filled"
                type="camera"
              />
            }
          />
          <AvatarEditor
            visible={visibleUpload}
            file={fileUpload}
            handleCancel={_onHideUpload}
          />
        </div>

        <div className="gx-d-flex gx-flex-column gx-align-items-center">
          <h1 className="gx-mt-3" style={{ color: '#52c41a' }}>
            {authUser.FullName}
          </h1>
          <span>Người dùng</span>
        </div>
      </div>
      <Item
        title="Ngày sinh:"
        value={
          authUser.DayOfBirth
            ? moment(authUser.DayOfBirth).format('DD-MM-YYYY')
            : 'Chưa cập nhật'
        }
        marginTop={true}
      />
      <Item
        title="Giới tính:"
        value={authUser.gender ? gender[`${authUser.gender}`] : 'Chưa cập nhật'}
      />
      <Item title="Điện thoại:" value={authUser.PhoneNumber} />
      <Item title="Email:" value={authUser.Email} />
      <div
        className="gx-text-right gx-px-4 gx-font-weight-bold gx-fs-sm gx-py-3"
        style={{ color: '#404272' }}
      >
        <Edit
          visible={visibleEdit}
          onSetVisible={(boolean) => onSetVisibleEdit(boolean)}
        />
        <u className="gx-pointer" onClick={() => onSetVisibleEdit(true)}>
          Chỉnh sửa
        </u>
      </div>
    </div>
  );
});

export default Index;
