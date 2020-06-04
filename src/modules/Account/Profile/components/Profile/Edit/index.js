import React from 'react';
import { Modal, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getProvince } from 'base/redux/General/GeneralAction';
import Account from './Account';
import Profile from './Profile';
import './styles.less';

const { TabPane } = Tabs;

const Index = React.memo(props => {
  const { visible } = props,
    dispatch = useDispatch(),
    { listProvince, listDistrict } = useSelector(state => state.GeneralReducer),
    { authUser } = useSelector(state => state.AuthReducer);

  const getProvinces = () => dispatch(getProvince());

  const handleCancel = () => {
    props.onSetVisible(false);
  };

  return (
    <Modal visible={visible} className="vz-popup-profile" onCancel={handleCancel} footer={null}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thông tin người dùng" key="1">
          <Profile
            authUser={authUser}
            provinces={listProvince}
            getProvinces={() => getProvinces()}
            //getDistricts={id => getDistricts(id)}
            districts={listDistrict}
          />
        </TabPane>
        <TabPane tab="Đổi mật khẩu" key="2">
          <Account authUser={authUser} />
        </TabPane>
      </Tabs>
    </Modal>
  );
});

export default Index;
