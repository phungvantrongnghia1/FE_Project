import React, { useMemo, useEffect, useState } from 'react';
import { Form, Input, Row, Col, Select, Button, DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { updateProfile } from 'modules/Account/redux/actions';
import moment from 'moment';
import PropTypes from 'prop-types';

const FormItem = Form.Item,
  msg = 'Vui lòng nhập thông tin';
const Index = React.memo(props => {
  const { getFieldDecorator } = props.form,
    { provinces, authUser } = props,
    [loading, setLoading] = useState(false),
    dispatch = useDispatch();

  /**
   * set initial value form
   */
  useEffect(() => {
    if (authUser) {
      props.form.setFieldsValue({
        FullName: authUser.FullName,
        PhoneNumber: authUser.PhoneNumber ? authUser.PhoneNumber : null,
        DayOfBirth: authUser.DayOfBirth ? moment(authUser.DayOfBirth) : undefined
      });
    }
  }, [authUser]);

  const _onGetProvices = () => {
    if (provinces.length <= 0) {
      props.getProvinces();
    }
  };

  const handleUpdateProfile = data => {
    setLoading(true);
    dispatch(
      updateProfile({
        data,
        cbSuccess: () => {
          NotificationManager.success('Cập nhật thông tin thành công', '', 5000);
        },
        cbError: msg => {
          NotificationManager.warning(msg, '', 5000);
        },
        cbHideLoading: () => {
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
          Id:authUser.Id,
          FullName: values.FullName,
          PhoneNumber: values.PhoneNumber,
          DayOfBirth: moment(values.DayOfBirth).format('YYYY-MM-DD')
        };
        handleUpdateProfile({ type: 'profile', data });
      }
    });
  };


  return (
    <Form className="gx-form-row0 login-form vz-form-profile">
      <Row className="gx-flex-column">
        {/* group 1 */}
        <div className="gx-flex-row gx-justify-content-center gx-mt-3">
          <Col lg={10} xl={10} md={10} xs={24} sm={12}>
            <FormItem className="form-item">
              {getFieldDecorator('FullName', {
                rules: [{ required: true, message: msg }]
              })(<Input className="gx-no-rounded" placeholder="Full name" />)}
            </FormItem>
          </Col>
          <Col lg={{ span: 10, offset: 4 }} xl={{ span: 10, offset: 4 }} md={{ span: 10, offset: 4 }} xs={24} sm={12}>
            <FormItem className="form-item">
              {getFieldDecorator('PhoneNumber', {
                rules: [
                  { required: true, message: msg },
                  {
                    pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                    message: 'Không đúng định dạng'
                  }
                ]
              })(<Input className="gx-no-rounded" placeholder="Số điện thoại" />)}
            </FormItem>
          </Col>
          <Col lg={24} xs={24} sm={24}>
            <FormItem className="form-item">
              {getFieldDecorator('DayOfBirth', {
                rules: [{ required: true, message: msg }]
              })(<DatePicker placeholder="Chọn ngày sinh" format="DD-MM-YYYY" className="gx-no-rounded gx-w-100" />)}
            </FormItem>
          </Col>
        </div>
        {/* group 2 */}
      </Row>
      <div className="gx-d-flex gx-justify-content-center gx-align-items-center gx-mt-3">
        <Button loading={loading} type="primary" onClick={handleSubmit}>
          Cập nhật
        </Button>
      </div>
    </Form>
  );
});

Index.propTypes = {
  authUser: PropTypes.object.isRequired
};

Index.defaultProps = {

};

export default Form.create()(Index);
