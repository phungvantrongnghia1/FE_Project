import React from 'react';
import { Row, Col, Button, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import PropType from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { NotificationManager } from 'react-notifications';
// import { addToCart, getIP } from 'modules/eCommerce/Cart/redux/actions';
// import { getOSDevice } from 'base/helper';
// import { login } from '../redux/actions';
import './style.less';

const FormItem = Form.Item;
const Container = React.memo(props => {
  const {
    textLeft,
    title,
    subTitleLeft,
    subTitleRight,
    otherWay,
    children,
    titleButton,
    _onButtonClick,
    toggleContent
  } = props;
  const { loadingBTN } = useSelector(state => state.GeneralReducer),
    dispatch = useDispatch();

  // const dispatchAddCart = data => {
  //   dispatch(
  //     addToCart({
  //       data,
  //       cbSuccess: () => {
  //         //NotificationManager.success(message, "", 2000);
  //       },
  //       cbError: message => {
  //         NotificationManager.warning(message, '', 2000);
  //       }
  //     })
  //   );
  // };

  // const handleAddCart = data => {
  //   if (!!ip_address) {
  //     dispatch(
  //       getIP({
  //         cbSuccess: ip_address => {
  //           data.ip_address = ip_address;
  //           dispatchAddCart(data);
  //         },
  //         cbError: () => {
  //           dispatchAddCart(data);
  //         }
  //       })
  //     );
  //   } else {
  //     dispatchAddCart(data);
  //   }
  // };

  // const onAddCartFromLocal = carts => {
  //   props.hideModal();
  //   if (carts.length > 0) {
  //     let items = [];

  //     carts.forEach(item => {
  //       items.push({
  //         course_id: item.id
  //       });
  //     });

  //   //   const data = {
  //   //     os_device: getOSDevice(),
  //   //     ip_address: '0.0.0.0',
  //   //     items
  //   //   };
  //   //   handleAddCart(data);
  //   // }
  // };

  const handleSuccessFacebook = response => {
    const data = {
      type: 'facebook',
      id: response.userID,
      access_token: response.accessToken,
      email: response.email,
      image: response.picture ? response.picture.data.url : '',
      last_name: response.name,
      first_name: ''
    };
    dispatch(
      // login({
      //   data,
      //   cbSuccess: (description, status_code) => {
      //     if (status_code === 200) {
      //       // login success with cart
      //       onAddCartFromLocal(carts);
      //     } else {
      //       // login failed
      //       NotificationManager.warning(description, '', 10000);
      //     }
      //   },
      //   cbError: error => {
      //     NotificationManager.error(error, '', 10000);
      //   }
      // })
    );
  };
  const handleErrorFacebook = () => {
    // NotificationManager.warning("Login with Facebook failed", "", 10000);
  };

  const handleSuccessGoogle = response => {
    const data = {
      type: 'google',
      id: response.googleId,
      access_token: response.accessToken,
      email: response.profileObj.email,
      image: response.profileObj.imageUrl ? response.profileObj.imageUrl : '',
      last_name: response.profileObj.familyName,
      first_name: response.profileObj.givenName
    };
    dispatch(
      // login({
      //   data,
      //   cbSuccess: (description, status_code) => {
      //     if (status_code === 200) {
      //       // login success with cart
      //       onAddCartFromLocal(carts);
      //     } else {
      //       // login failed
      //       NotificationManager.warning(description, '', 10000);
      //     }
      //   },
      //   cbError: error => {
      //     NotificationManager.error(error, '', 10000);
      //   }
      // })
    );
  };
  const handleErrorGoogle = () => {
    // NotificationManager.warning("Login with Google failed", "", 10000);
  };
  return (
    <div className="gx-login-container gx-pb-0">
      <Row className="gx-w-100 gx-h-100">
        <Col xl={12} lg={12} md={12} sm={0} className="gx-p-0 mobile-hidden">
          <div
            className="gx-flex-column gx-justify-content-center gx-align-items-center"
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#3AA354'
            }}
          >
            <img src={require('assets/images/Group 315.png')} alt="Review" />
            <span className="gx-font-weight-bold gx-text-white" style={{ fontSize: '30px', marginTop: '16px' }}>
              {textLeft}
            </span>
          </div>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24} className="gx-p-0 gx-bg-white">
          <div className="gx-flex-column gx-w-100 gx-p-5">
            <div className="gx-mb-4">
              <h1 className="gx-mb-0 gx-font-weight-bold" style={{ color: '#404272', fontSize: '35px' }}>
                {title}
              </h1>
              <small style={{ fontSize: 10 }} className="gx-fs-sm gx-pt-2">
                {subTitleLeft} <a onClick={toggleContent}>{subTitleRight}</a>
              </small>
            </div>
            <div style={{ marginBottom: '30px' }}>
              <div className="gx-d-flex">
                <span className="gx-font-weight-light" style={{ color: '#404272', fontSize: '10px' }}>
                  {otherWay}
                </span>
                <hr className="gx-w-50" />
              </div>
              <div className="gx-w-100 gx-flex-row ">
                <FacebookLogin
                  className="button-login"
                  appId={process.env.ID_FB}
                  icon="fa-facebook-official"
                  textButton="Facebook"
                  fields="name,email,picture"
                  callback={handleSuccessFacebook}
                  onFailure={handleErrorFacebook}
                  cssClass="btn-login facebook"
                />
                <GoogleLogin
                  clientId={process.env.ID_GG}
                  buttonText="Google"
                  className="btn-login google gx-ml-3"
                  onSuccess={handleSuccessGoogle}
                  onFailure={handleErrorGoogle}
                />
              </div>
            </div>
            <div>
              <div className="gx-d-flex">
                <span className="gx-font-weight-light" style={{ color: '#404272', fontSize: '10px' }}>
                  Hoặc
                </span>
                <hr className="gx-w-100" />
              </div>
              <Form className="gx-login-form gx-form-row0">
                {children}
                <FormItem className="ft-form-ac gx-text-right">
                  <Button
                    style={{ backgroundColor: '#FE7411', color: '#FFF' }}
                    className="st-btn-login gx-mb-0"
                    onClick={_onButtonClick}
                    loading={loadingBTN}
                  >
                    {titleButton}
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
});

Container.PropType = {
  children: PropType.node.isRequired,
  title: PropType.string.isRequired,
  subTitleLeft: PropType.string.isRequired,
  subTitleRight: PropType.string.isRequired,
  otherWay: PropType.string.isRequired,
  titleButton: PropType.string.isRequired,
  _onButtonClick: PropType.func.isRequired
};

export { Container };
