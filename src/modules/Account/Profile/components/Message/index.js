import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Pagination, Modal } from "antd";
import Item from "./Item";
import NotFound from "components/Error";

const Index = props => {
  const { message } = useSelector(state => state.AuthReducer),
    [visible, setVisible] = useState(false),
    [content, setContent] = useState("");

  const showItem = data => {
      let result = (
        <NotFound
          className="profile-history"
          isShow404={false}
          msg="Bạn không có tin nhắn nào"
          link="/"
          btnText="Quay lại"
        />
      );
      if (data.length > 0) {
        result = data.map(item => (
          <div key={item.id}>
            <Item onShowContent={msg => _onShowContent(msg)} item={item} />
          </div>
        ));
      }
      return result;
    },
    elmItem = useMemo(() => showItem(message.data ? message.data : []), [
      message
    ]);

  const _chagePage = page => {
    props.onGetListMessage(`page=${page}`);
  };

  const _onCancelModal = () => setVisible(false);

  const _onShowContent = content => {
    setVisible(true);
    setContent(content);
  };

  return (
    <div className="gx-mt-3">
      {elmItem}
      <div className="gx-d-flex gx-justify-content-center gx-align-items-center">
        {message && message.perPage <= message.total && (
          <Pagination
            className="vz-custom-pagination"
            current={message.page || 1}
            onChange={_chagePage}
            pageSize={message.perPage ? message.perPage : 4}
            total={message.total && message.total}
          />
        )}
      </div>
      <Modal visible={visible} footer={null} onCancel={_onCancelModal}>
        {content}
      </Modal>
    </div>
  );
};

export default Index;
