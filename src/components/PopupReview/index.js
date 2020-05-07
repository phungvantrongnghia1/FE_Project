import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input, Rate } from 'antd';
import './styles.less';

const Index = React.memo(props => {
  const { visible, loading, callbackSubmit, onVisibleModal } = props,
    [rate, setRate] = useState(1),
    [content, setContent] = useState('');

  const _onSetRate = rate => setRate(rate);

  const _onSetContent = e => {
    setContent(e.target.value);
  };

  const _handleCancel = () => {
    setRate(1);
    onVisibleModal(false);
  };

  const onSubmitReview = () => {
    const data = {
      rate,
      content
    };
    callbackSubmit(data);
  };
  return (
    <Modal
      bodyStyle={{ textAlign: 'center' }}
      visible={visible}
      afterClose={_handleCancel}
      className="vz-popup-profile"
      onCancel={_handleCancel}
      footer={null}
    >
      <div className="wrapper-review">
        <div className="gx-flex-row gx-justify-content-between gx-pb-1 gx-mb-1 gx-border-bottom">
          <strong>Nhận xét về khóa học</strong>
          <Rate allowHalf onChange={_onSetRate} className="gx-fs-sm" defaultValue={rate} />
        </div>
        <div className="wrapper-txt-area">
          <Input.TextArea onChange={_onSetContent} rows={5} className="gx-no-rounded" placeholder="Nhận xét của bạn" />
        </div>
        <div className="gx-text-center gx-mt-3">
          <Button loading={loading} onClick={onSubmitReview} className="gx-mb-0 gx-btn-orange">
            Gửi
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
