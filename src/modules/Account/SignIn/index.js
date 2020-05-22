import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { Form, Input, Icon, Modal } from 'antd';
import { showLoadingBtn, hideLoadingBtn } from 'base/redux/General/GeneralAction';
import { Container } from '../common/Container';
import { login } from '../redux/actions';

import ForgotPassword from '../ForgotPassword';
import SignUp from '../SignUp';
import './signIn.less';

const FormItem = Form.Item;

const bodyStyleModal = {
  padding: 0
};
const Index = React.memo(props => {
  const dispatch = useDispatch(),
    { visible, showText, toggleContent } = props,
    { getFieldDecorator } = props.form;

  const showContentSignIn = (
    <Container
      textLeft="Welcome back!"
      title="Đăng nhập"
      subTitleLeft="Chưa có tài khoản?"
      subTitleRight="Đăng ký ngay!"
      otherWay="Hoặc đăng nhập nhanh bằng"
      titleButton="Đăng nhập"
      _onButtonClick={e => handleSignin(e)}
      showText={showText}
      toggleContent={toggleContent}
      hideModal={() => props.hideModal()}
    >
      <FormItem className="gx-mb-3">
        {getFieldDecorator('Email', {
          rules: [
            { required: true, message: 'Vui lòng nhập tài khoản!' },
            { type: 'email', message: 'Địa chỉ email không đúng!' }
          ]
        })(<Input prefix={<Icon type="mail" />} placeholder="Địa chỉ email của bạn" />)}
      </FormItem>
      <FormItem className="gx-mb-0">
        {getFieldDecorator('Password', {
          rules: [{ required: true, message: 'Vui lòng nhập mật khẩu!' }]
        })(<Input prefix={<Icon type="lock" />} type="password" placeholder="Mật khẩu đăng nhập" />)}
      </FormItem>
      <div className="gx-mt-1 gx-mb-3">
        <ForgotPassword />
      </div>
    </Container>
  );

  /**
   * @function handleCancel
   * @summary Close Modal Sign in
   */
  const handleCancel = () => {
    props.hideModal();
  };




  /**
   * @function handleSignin
   * @summary call api sign in and close modal
   */
  const handleSignin = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(showLoadingBtn());
        dispatch(
          login({
            data: values,
            cbSuccess: (description, status_code) => {
              if (status_code === 200) {
                props.hideModal();
                // login success with cart
              } else {
                // login failed
                NotificationManager.warning(description, '', 10000);
              }
              dispatch(hideLoadingBtn());
            },
            cbError: error => {
              NotificationManager.error(error, '', 10000);
              dispatch(hideLoadingBtn());
            }
          })
        );
      }
    });
  };

  return (
    <Modal
      width={765}
      footer={null}
      bodyStyle={bodyStyleModal}
      visible={visible}
      onCancel={handleCancel}
      afterClose={() => props.form.resetFields()}
    // onOk={handleSignin}
    >
      {!showText ? (
        showContentSignIn
      ) : (
          <SignUp showText={showText} toggleContent={toggleContent} hideModal={props.hideModal} />
        )}
    </Modal>
  );
});

export default Form.create()(Index);
