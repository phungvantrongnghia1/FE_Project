import React, { useRef, useState } from 'react';
import { Modal, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { urltoFile } from 'base/helper';
import { updateProfile } from 'modules/Account/redux/actions';
import AvatarEditor from 'components/AvatarEditor';

const Avatar = React.memo(props => {
  const { visible, handleCancel, file } = props,
    [loading, setLoading] = useState(false),
    dispatch = useDispatch(),
    refEditor = useRef();

  const handleUpdateProfile = data => {
    setLoading(true);
    dispatch(
      updateProfile({
        data,
        cbSuccess: () => {
          NotificationManager.success('Cập nhật thông tin thành công', '', 5000);
          handleCancel();
        },
        cbError: msg => {
          NotificationManager.warning(msg, '', 5000);
        },
        cbHideLoading: () => {
          setLoading(false);
        }
      })
    );
  };

  const _onUploadAvatar = () => {
    const base64 = refEditor.current._onGetFile();
    urltoFile(base64, file.name, file.type).then(res => {
      if (res) {
        const data = new FormData();
        data.append('image', res);
        handleUpdateProfile({ type: 'avatar', data: data });
      }
    });
  };
  return (
    <Modal
      bodyStyle={{ textAlign: 'center' }}
      visible={visible}
      className="vz-popup-profile"
      onCancel={handleCancel}
      footer={null}
    >
      <AvatarEditor ref={refEditor} file={file} />
      <div className="footer-upload-avatar gx-text-right">
        <Button onClick={handleCancel} className="gx-mb-0">
          Hủy
        </Button>
        <Button loading={loading} onClick={_onUploadAvatar} className="gx-mb-0" type="primary">
          Lưu
        </Button>
      </div>
    </Modal>
  );
});

export default Avatar;
