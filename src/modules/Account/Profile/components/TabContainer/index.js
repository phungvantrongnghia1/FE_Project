import React from 'react';
import { Tabs } from 'antd';

import './styles.less';
const { TabPane } = Tabs;

const Index = props => {
  const _onChangeTab = key => {
    if (+key === 2) {
      props.onGetListCourseFavorited();
    }

    if (+key === 3) {
      props.onGetListMessage();
    }

    if (+key === 5) {
      props.onGetListOrders('status=2');
    }
  };
  return (
    <Tabs defaultActiveKey="1" className="vz-custome-tabs" onChange={_onChangeTab}>
      <TabPane tab="Lịch sử" key="1">
        1
      </TabPane>
      <TabPane tab="Khóa học đã thích" key="2">
        2
      </TabPane>
      <TabPane tab="Đơn hàng" key="5">
        3      </TabPane>
      <TabPane tab="Tin nhắn" key="3">
        4      </TabPane>
      <TabPane tab="Nhật ký" key="4">
        5      </TabPane>
    </Tabs>
  );
};

export default Index;
