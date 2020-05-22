import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { Form, Input, Icon, Checkbox } from 'antd';
import { Container } from '../common/Container';
// import { signUp } from '../redux/actions';
import ForgotPassword from '../ForgotPassword';
import './signUp.less';

let passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,64}$/;

const FormItem = Form.Item;

const Index = (props) => {
  const dispatch = useDispatch();
  const { showText, toggleContent } = props;
  const { getFieldDecorator } = props.form,
    { checkProvision, setCheckProvision } = useState(false);

  /**
   * @function handleSubmit
   * @summary call api sign in and close modal
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        // dispatch(
        //   signUp({
        //     info: values,
        //     callback: (description, status_code) => {
        //       if (status_code === 200) {
        //         props.form.resetFields();
        //         NotificationManager.success(description, null, 5000);
        //         props.hideModal();
        //       }
        //     },
        //     errorCallback: (error) => {
        //       NotificationManager.warning(error, null, 5000);
        //     }
        //   })
        // );
      }
    });
  };

  return (
    <Container
      textLeft="Welcome!"
      title="Đăng ký"
      subTitleLeft="Đã có tài khoản?"
      subTitleRight="Đăng nhập!"
      otherWay="Đăng ký nhanh bằng"
      titleButton="Đăng ký"
      _onButtonClick={(e) => handleSubmit(e)}
      showText={showText}
      toggleContent={toggleContent}
    >
      <div className="gx-d-flex gx-justify-content-between">
        <FormItem style={{ width: '45%' }}>
          {getFieldDecorator('first_name', {
            rules: [
              { required: true, message: 'Tên bạn là gì?' },
              { type: 'string', message: 'Vui lòng không nhập số!' }
            ]
          })(<Input prefix={<Icon type="user" />} placeholder="Họ" />)}
        </FormItem>
        <FormItem style={{ width: '45%' }}>
          {getFieldDecorator('last_name', {
            rules: [
              { required: true, message: 'Tên bạn là gì?' },
              { type: 'string', message: 'Vui lòng không nhập số!' }
            ]
          })(<Input prefix={<Icon type="user" />} placeholder="Tên" />)}
        </FormItem>
      </div>
      <FormItem className="gx-mb-3">
        {getFieldDecorator('email', {
          rules: [
            { required: true, message: 'Vui lòng nhập tài khoản!' },
            { type: 'email', message: 'Địa chỉ email không đúng!' }
          ]
        })(
          <Input
            prefix={<Icon type="mail" />}
            placeholder="Địa chỉ email của bạn"
          />
        )}
      </FormItem>
      <FormItem className="gx-mb-0">
        {getFieldDecorator('password', {
          rules: [
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            {
              pattern: passReg,
              message: 'Mật khẩu cần có số , chữ thường và hoa!'
            }
          ]
        })(
          <Input
            prefix={<Icon type="lock" />}
            type="password"
            placeholder="Mật khẩu đăng nhập"
          />
        )}
      </FormItem>
      <FormItem className="gx-mb-0">
        <Checkbox checked value={true}>
          <span className="gx-fs-xs">
            Với việc đăng ký bạn đã đồng ý với điều khoản của chúng tôi.
          </span>
        </Checkbox>
      </FormItem>
    </Container>
  );
};

export default Form.create()(Index);
