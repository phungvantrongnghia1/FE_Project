import React, { useEffect } from 'react';
import TabContainer from './components/TabContainer';
import Profile from './components/Profile';
import { Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
// import {
//   getListCoursePurchased,
//   getListCourseFavorited
// } from 'modules/eCommerce/Course/redux/actions';
// import { getListMessage, getListOrders } from '../../redux/actions';
import Progress from 'utils/CircularProgress';

const Index = React.memo(() => {
    const { authUser } = useSelector((state) => state.AuthReducer),
        { loaderComponent } = useSelector((state) => state.GeneralReducer),
        dispatch = useDispatch();
    console.log('authUser', authUser)
    useEffect(() => {
        onGetListCoursePurchased();
    }, []);

    const onGetListCoursePurchased = (strQuery) => {
        return null;
    }
    // dispatch(getListCoursePurchased(strQuery));

    const onGetListCourseFavorited = (strQuery) => {
        return;
    }
    // dispatch(getListCourseFavorited(strQuery));

    const onGetListMessage = (strQuery) => {
        return;
    }
    //   dispatch(getListMessage(strQuery));

    const onGetListOrders = (strQuery) => {
        return;
    }
    //   dispatch(getListOrders(strQuery));

    return (
        <div className="gx-px-5 gx-my-3 set-layout-1200">
            <div className="gx-mb-3 gx-mt-3">
                <div className="gx-d-flex gx-justify-content-between">
                    <span className="gx-fs-xl" style={{ color: '#3DB166' }}>
                        Thông tin tài khoản
          </span>
                </div>
                <hr className="gx-mt-1" />
            </div>
            <Row>
                <Col lg={6} xl={6} md={0} xs={24}>
                    <div style={{ width: '100%', height: '100%' }}>
                        <Profile authUser={authUser} />
                    </div>
                </Col>
                <Col lg={18} xl={18} md={24} xs={24}>
                    <TabContainer
                        onGetListCoursePurchased={(strQuery) =>
                            onGetListCoursePurchased(strQuery)
                        }
                        onGetListCourseFavorited={(strQuery) =>
                            onGetListCourseFavorited(strQuery)
                        }
                        onGetListMessage={(strQuery) => onGetListMessage(strQuery)}
                        onGetListOrders={(strQuery) => onGetListOrders(strQuery)}
                    />
                    {loaderComponent ? (
                        <div className="st-loader-view-mask gx-position-absolute gx-h-100">
                            <Progress />
                        </div>
                    ) : null}
                </Col>
            </Row>
        </div>
    );
});

export default Index;
