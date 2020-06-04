import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import CustomScrollbars from 'utils/CustomScrollbars';
import Item from './Item';
import './styles.less';

const Index = React.memo(props => {
  const { visible, onVisibleModal, data } = props;

  const _handleCancel = () => {
    onVisibleModal(false);
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
      <div className="wrapper-order-detail">
        <div className="gx-flex-row gx-justify-content-between gx-pb-1 gx-mb-2">
          <strong>Chi tiết đơn hàng</strong>
        </div>
        <div className="order-detail-body">
          <CustomScrollbars
            className="vz-popover-scroll"
            style={{ height: +data.length >= 3 ? '230px' : `${230 / (3 / data.length)}px` }}
          >
            <ul className="gx-sub-popover">
              {data.map((item, idx) => (
                <Item key={idx} item={item} />
              ))}
            </ul>
          </CustomScrollbars>
        </div>
        <div className="gx-text-center gx-mt-3">
          <Button onClick={_handleCancel} className="gx-mb-0 gx-btn-success">
            Đóng
          </Button>
        </div>
      </div>
    </Modal>
  );
});
Index.propTypes = {
  visible: PropTypes.bool,
  onVisibleModal: PropTypes.func,
  data: PropTypes.array
};

Index.defaultProps = {
  visible: false,
  onVisibleModal: null,
  data: []
};
export default Index;
