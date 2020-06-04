import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import moment from 'moment';
import './styles.less';

function Index(props) {
  const { item } = props;
  const _onShowContent = (msg) => props.onShowContent(msg);
  return (
    <div
      onClick={() => _onShowContent(item.content)}
      className="gx-mb-5 vz-item-mess gx-pointer"
    >
      <div className="vz-img-mess">
        <Avatar
          className="gx-mr-3"
          style={{ backgroundColor: '#ccc' }}
          size={40}
          src={item.image}
        ></Avatar>
        <h4 className="gx-mb-0">{`${item.last_name} ${item.first_name}`}</h4>
      </div>
      <div style={{ width: '60%' }}>
        <h4 className="test gx-mb-0">{item.content}</h4>
      </div>
      <div>
        <h4>{moment(item.created_at).format('DD/MM/YYYY HH:ss')}</h4>
      </div>
    </div>
  );
}

Index.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string
  })
};

export default Index;
