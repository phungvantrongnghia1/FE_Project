import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Button, Form, Icon, Input, Modal} from 'antd';
import {NotificationManager} from 'react-notifications';
// import {forgotPassword} from 'modules/Account/redux/actions';
import './forgotPassword.less';

const FormItem = Form.Item;
const {success} = Modal;

const Index = (props) => {
	const dispatch = useDispatch();
	const [toggleModal, setModal] = useState({visible: false});
	const {visible} = toggleModal;

	const showPopUp = (content) => {
		success({
			title: 'Đã gửi email',
			content: content,
			className: 'forgot-password-confirm'
		});

	};

	const showModal = () => {
		setModal({...toggleModal, visible: !visible});
	};

	const handleSubmit = e => {
		e.preventDefault();
		props.form.validateFields((err, values) => {
			if (!err) {
				// dispatch(forgotPassword({
				// 	email: values,
				// 	callback: (message) => {
				// 		props.form.resetFields();
				// 		setModal({...toggleModal, visible: false});
				// 		showPopUp(message);
				// 	},
				// 	errorCallback: (error) => {
				// 		NotificationManager.error(error, 'Email không tồn tại', 10000);
				// 		props.form.resetFields();
				// 	}
				// }));
			}
		});
	};

	const handleCancel = e => {
		setModal({...toggleModal, visible: false});
	};

	const {getFieldDecorator} = props.form;

	return (
		<React.Fragment>
			<small onClick={showModal} className="gx-login-form-forgot gx-pointer gx-text-primary" style={{fontSize: "10px"}}>
				Quên mật khẩu?
			</small>
			<Modal
				className="modal-forgot-password"
				visible={visible}
				onOK={handleSubmit}
				onCancel={handleCancel}
				footer={null}
			>
				<h2>Quên mật khẩu?</h2>
				<p>Vui lòng nhập email đã đăng ký để đặt lại mật khẩu mới</p>
				<Form className="gx-login-form gx-form-row0 modal-form">
					<FormItem>
						{getFieldDecorator("email", {
							rules: [{required: true, message: "Vui lòng nhập tài khoản!"},
								{type: 'email', message: 'Địa chỉ email không đúng!'}]
						})(
							<Input
								prefix={<Icon type="mail"/>}
								placeholder="Email"
							/>
						)}
					</FormItem>
					<FormItem className="ft-form-ac gx-text-center">
						<Button onClick={handleSubmit} className="gx-btn-red btn-forgot-password">
							Xác nhận
						</Button>
					</FormItem>
				</Form>
			</Modal>
		</React.Fragment>
	);
};

export default Form.create()(Index);
