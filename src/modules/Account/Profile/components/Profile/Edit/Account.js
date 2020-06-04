import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { changePassword } from 'modules/Account/redux/actions';

const FormItem = Form.Item;
const ERR_FORM_MESSAGE = 'Chưa nhập thông tin';

const Account = React.memo(props => {
  const { getFieldDecorator } = props.form,
    [loading, setLoading] = useState(false),
    { form, authUser } = props,
    dispatch = useDispatch();

  const compareToFirstPassword = (_rule, value, callback) => {
    if (value && value !== form.getFieldValue('new_password')) {
      callback('Mật khẩu không khớp');
    } else {
      callback();
    }
  };

  const validateNewPW = (_rule, value, callback) => {
    if (value) {
      const regex = /^(?=.*[a-z])(?=.{6,})/;
      form.validateFields(['confirm'], { force: true });
      if (!regex.exec(value)) {
        callback('Mật khẩu tối thiểu 6 ký tự bao gồm cả chữ và số.');
      }
    }
    callback();
  };

  const handleChangePassword = data => {
    setLoading(true);
    dispatch(
      changePassword({
        data,
        cbSuccess: () => {
          NotificationManager.success('Đổi mật khẩu thành công', '', 5000);
        },
        cbError: msg => {
          NotificationManager.warning(msg, '', 5000);
        },
        cbHideLoading: () => {
          props.form.resetFields();
          setLoading(false);
        }
      })
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          current_password: values.old_password ? values.old_password : null,
          password: values.new_password
        };
        handleChangePassword(data);
      }
    });
  };

  return (
    <Form className="gx-form-row0 login-form">
      {authUser.hasPassword ? (
        <FormItem className="gx-mb-3">
          {getFieldDecorator('old_password', {
            rules: [{ required: true, message: ERR_FORM_MESSAGE }]
          })(<Input className="gx-no-rounded" type="password" placeholder="Mật khẩu cũ" />)}
        </FormItem>
      ) : null}

      <FormItem className="gx-mb-3">
        {getFieldDecorator('new_password', {
          rules: [{ required: true, message: ERR_FORM_MESSAGE }, { validator: validateNewPW }]
        })(<Input className="gx-no-rounded" type="password" placeholder="Mật khẩu mới" />)}
      </FormItem>
      <FormItem className="gx-mb-3">
        {getFieldDecorator('confirm', {
          rules: [{ required: true, message: ERR_FORM_MESSAGE }, { validator: compareToFirstPassword }]
        })(<Input className="gx-no-rounded" type="password" placeholder="Nhập lại mật khẩu mới" />)}
      </FormItem>
      <div className="gx-d-flex gx-justify-content-center gx-align-items-center">
        <Button loading={loading} type="primary" onClick={handleSubmit}>
          Đổi mật khẩu
        </Button>
      </div>
    </Form>
  );
});
export default Form.create()(Account);
