import React from 'react';
import { Layout, Row, Col, Icon } from 'antd';

import './footer.less';

const { Footer } = Layout;

const Index = React.memo(() => {

  return (
    <Footer className="footer">
      <div className="gx-text-center">
        <img style={{ width: 98 }} src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.15752-9/98204332_273603697376215_4936225893480660992_n.png?_nc_cat=100&_nc_sid=b96e70&_nc_ohc=J9pnNQa8cNwAX8toYVm&_nc_ht=scontent.fsgn2-2.fna&oh=ea37f8f910cd90f14c50f45fd4e9460b&oe=5EECA556" />
      </div>
      <Row className="gx-text-center gx-my-3">
        <Col span={8} className="gx-text-white">
          <h1 className="gx-text-white gx-fs-xxl gx-py-3">Hỗ trợ khách hàng</h1>
          <div className="gx-text-left gx-w-50 gx-m-auto  gx-pl-3">
            <p><a href="#" className=" gx-text-white"><Icon type="facebook" /> <span>Facebook</span></a></p>
            <p><a href="#" className=" gx-text-white"><Icon type="twitter" /> <span>Twitter</span></a></p>
            <p><a href="#" className=" gx-text-white"><Icon type="skype" /> <span>Skype</span></a></p>
          </div>
        </Col>
        <Col span={8} className="gx-text-left ">
          <div className=" gx-w-50 gx-m-auto">
            <h1 className="gx-text-white gx-fs-xxl gx-py-3">Giúp đỡ</h1>
            <p><a href="#" className=" gx-text-white">Câu hỏi thường gặp</a></p>
            <p><a href="#" className=" gx-text-white">Điều khoản sử dụng</a></p>
            <p><a href="#" className=" gx-text-white">Quy định chính sách bán tài liệu</a></p>
          </div>


        </Col>
        <Col span={8}>
          <h1 className="gx-text-white gx-fs-xxl gx-py-3">Giới thiệu</h1>
          <p><a href="#" className=" gx-text-white">share là gì ?</a></p>
        </Col>

      </Row>
    </Footer>
  );
});

export default Index;
