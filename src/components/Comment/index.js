import React, { useState } from 'react';
import { Comment, Avatar, Tooltip, message } from 'antd';
import moment from 'moment';
import ResponseInput from 'components/TextComment';
import './styles.less';

const Index = React.memo((props) => {
  const { item } = props,
    [visible, setVisible] = useState(false),
    [idParent, setIdParent] = useState(0);

  const response = (visible, idParent) => (
    <>
      <span
        key="comment-nested-reply-to"
        onClick={() => _onShowResponseComment(idParent)}
        className="gx-text-primary gx-d-block gx-pointer gx-fs-sm"
      >
        Trả lời
      </span>
      {visible && (
        <ResponseInput
          onSubmit={(msg) => _onSubmit(msg)}
          rows={2}
          placeholder="Nhập câu trả lời của bạn"
        />
      )}
    </>
  );

  const _onSubmit = (msg) => {
    if (item.pivot && idParent !== 0) {
      const data = {
        parent_question_id: idParent,
        lesson_id: item.pivot.lesson_id,
        msg
      };
      props.onSubmit(data);
    } else message.error('Có lỗi xảy ra');
  };

  const _onShowResponseComment = (id) => {
    setVisible(true);
    setIdParent(id);
  };
  return (
    <Comment
      key={item.id}
      className="gx-bg-white gx-rouded-md gx-mb-3 gx-p-3 gx-box-shadow"
      author={
        <a
          className="gx-fs-md gx-font-weight-bold"
          style={{ color: '#404272' }}
        >
          {`${item.customer.last_name} ${item.customer.first_name}`}
        </a>
      }
      avatar={
        <Avatar
          size={40}
          src={
            !!item.customer.image
              ? item.customer.image
              : require('assets/images/productTest/avatar_teacher.png')
          }
          alt="avatar"
        />
      }
      content={
        !!item.childrens ? (
          <div>
            {item.content}
            {item.parent_id === 0 && response(visible, item.id)}
            {
              <div className="vz-ask-child gx-mt-1">
                {props.showChildrens(item.childrens)}
              </div>
            }
          </div>
        ) : (
          <p>
            {item.content}
            {item.parent_id === 0 && response(visible, item.id)}
          </p>
        )
      }
      datetime={
        <Tooltip
          title={moment(item.created_at)
            .add(7, 'hours')
            .format('DD:MM:YYYY HH:mm')}
        >
          <span>{moment(item.created_at).add(7, 'hours').fromNow()}</span>
        </Tooltip>
      }
    />
  );
});

export default Index;
