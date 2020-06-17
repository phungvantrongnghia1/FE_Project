import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button
} from 'antd';
import {useSelector} from "react-redux";
import { createDoc, updateDoc } from 'modules/Document/redux/actions';
import FileUpload from '../FileUpload';

import './style.less';
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const Index = (props) => {
  const dispatch = useDispatch();
  const refUploadImage = useRef();
  const refUploadFile = useRef(),
  { loadingBTN } = useSelector((state) => state.GeneralReducer);
  const { getFieldDecorator } = props.form,
    { data, docsCate, typeAc } = props;
  console.log('data :>> ', data);
  const ERR_FORM_MESSAGE = 'Require';
  useEffect(() => {
    if (Object.entries(data).length) {
      props.form.setFieldsValue({
        Title: data.Title,
        CategoryDocumentId: data.CategoryDocumentId,
        Content_trailer: data.Content_trailer
      });
    }
  }, [data]);
  const filterOptionByList = (data) => {
    let result = data.map((item, index) => (
      <Option key={item.Id} value={item.Id}>
        {item.Title}
      </Option>
    ));
    return result;
  };
  const createCate = (payload) => {
    dispatch(
      createDoc({
        payload,
        callbackSuccess: (message) => {
          NotificationManager.success(message, '', 2000);
          props.form.resetFields();
          refUploadImage.current._onResetFile();
          refUploadFile.current._onResetFile();
        },
        callbackError: (message) => {
          NotificationManager.error(message, '', 2000);
        }
      })
    );
  };
  const updateDocFc = (payload) => {
    dispatch(
      updateDoc({
        payload,
        callbackSuccess: (message) => {
          NotificationManager.success(message, '', 2000);
          if (typeAc) {
            props.form.resetFields();
            refUploadImage.current._onResetFile();
            refUploadFile.current._onResetFile();
          }
        },
        callbackError: (message) => {
          NotificationManager.error(message, '', 2000);
        }
      })
    );
  };
  const _onSubmit = (e) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      const image = refUploadImage.current._onGetFile();
      const file = refUploadFile.current._onGetFile();
      let formData = new FormData();
      Object.entries(values).map(([key, value]) => formData.append(key, value));
      if (image !== null && file !== null && typeAc) {
        formData.append('file', file);
        formData.append('image', image);
      } else if (!typeAc) {
        formData.append('Id', data.Id);
        if (image !== null) formData.append('image', image);
         if (file !== null) formData.append('file', file);
      }
      if (typeAc) createCate(formData);
      else updateDocFc(formData);
    });
  };
  console.log('typeAc', typeAc)
  return (
    <Form layout="inline" className="upload_docs">
      <Row>
        <Col span={16}>
          <FormItem label="Tiêu đề">
            {getFieldDecorator('Title', {
              rules: [{ required: true, message: ERR_FORM_MESSAGE }],
              initialValue: ''
            })(<Input placeholder="Tiêu đề" />)}
          </FormItem>
          <Form.Item label="Danh mục" className="gx-w-100">
            {getFieldDecorator('CategoryDocumentId')(
              <Select
                className="gx-w-100"
                showSearch
                placeholder="Chọn danh mục"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {filterOptionByList(docsCate)}
              </Select>
            )}
          </Form.Item>
          <FormItem label="Nội dung tốm tắt">
            {getFieldDecorator('Content_trailer', {
              rules: [{ required: true, message: ERR_FORM_MESSAGE }],
              initialValue: ''
            })(<TextArea placeholder="Nội dung tài liệu" />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="Hình ảnh">
            <FileUpload
              actCreate={false}
              ref={refUploadImage}
              url={
                Object.entries(data).length !== 0 ? JSON.parse(data.Image) : ''
              }
              typeFileUpload="image"
            />
          </FormItem>
          <FormItem label="File">
            <FileUpload
              actCreate={false}
              ref={refUploadFile}
              url={
                Object.entries(data).length !== 0 ? JSON.parse(data.File) : ''
              }
              typeFileUpload="application/pdf"
            />
          </FormItem>
        </Col>
      </Row>
      <div className="gx-text-right">
        <Button type="primary" onClick={_onSubmit} loading={loadingBTN}>
          {typeAc ? 'Thêm' : 'Cập nhật'}
        </Button>
      </div>
    </Form>
  );
};
Index.propTypes = {};
Index.defaultProps = {
  data: {}
};
export default withRouter(Form.create()(Index));
