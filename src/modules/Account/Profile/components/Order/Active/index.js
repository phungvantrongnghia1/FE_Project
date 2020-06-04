import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input } from 'antd';
import './styles.less';

const Index = React.memo((props) => {
  const { visible, loading, callbackSubmit, onVisibleModal } = props,
    [content, setContent] = useState(''),
    [classErr, setClassErr] = useState('');

  const _onSetContent = (e) => {
    const { value } = e.target;
    if (value) setClassErr('');
    else setClassErr('input-error');
    setContent(value);
  };

  const _handleCancel = () => {
    setContent('');
    setClassErr('');
    onVisibleModal(false);
  };

  const onSubmit = () => {
    if (content) {
      callbackSubmit({ code: content.trim() });
    } else {
      setClassErr('input-error');
    }
  };
  return (
    <Modal
      bodyStyle={{ textAlign: 'center' }}
      visible={visible}
      width={400}
      afterClose={_handleCancel}
      className="vz-popup-profile"
      onCancel={_handleCancel}
      footer={null}
    >
      <div className="wrapper-review">
        <div className="gx-flex-row gx-justify-content-between gx-pb-1 gx-mb-2">
          <strong>Kích hoạt đơn hàng</strong>
        </div>
        <div className="wrapper-txt-area">
          <Input onChange={_onSetContent} className={`gx-no-rounded ${classErr}`} placeholder="Mã kích hoạt của bạn" />
        </div>
        <div className="gx-text-center gx-mt-3">
          <Button loading={loading} onClick={onSubmit} className="gx-mb-0 gx-btn-success">
            Kích hoạt
          </Button>
        </div>
      </div>
    </Modal>
  );
});
Index.propTypes = {
  visible: PropTypes.bool,
  callbackSubmit: PropTypes.func,
  onVisibleModal: PropTypes.func
};

Index.defaultProps = {
  visible: false,
  callbackSubmit: null,
  onVisibleModal: null
};
export default Index;
