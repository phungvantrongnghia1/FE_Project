import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Icon } from 'antd';
import './styles.less';
const Index = React.memo((props) => {
  const { profile } = props;
  return (
    <div
      className="profile-teacher gx-bg-white gx-box-shadow"
      style={{ padding: '27px 20px' }}
    >
      <div className="gx-flex-row gx-mb-3">
        <div className="profile-teacher-avatar gx-mr-3">
          <Avatar
            size={100}
            src={profile.image}
            onError={() => require('assets/images/logo.png')}
          />
        </div>
        <div
          className="gx-d-flex gx-flex-column gx-justify-content-center profile-teacher-infor"
          style={{ color: '#404272' }}
        >
          <div className="gx-mb-2">
            <p className="gx-mb-0 gx-font-weight-bold">{profile.title}</p>
            <i className="gx-mb-0 gx-fs-sm">
              {profile.major ? profile.major : 'Đang cập nhật'}
            </i>
          </div>
          <div className="gx-mb-1">
            <Icon className="gx-mr-2" type="star" theme="filled" />
            <span className="gx-font-weight-medium">{profile.rate}</span>
            <span className="gx-font-weight-light">({profile.total_rate})</span>
          </div>
          <div className="gx-mb-1">
            <Icon className="gx-mr-2" type="team" />
            <span className="gx-font-weight-light">
              {profile.members} học viên
            </span>
          </div>
          <div className="gx-mb-1">
            <Icon className="gx-mr-2" type="play-circle" theme="filled" />
            <span className="gx-font-weight-light">
              {profile.totalCourse} Bài giảng
            </span>
          </div>
          <div className="gx-mb-1">
            {/* <i className="icon icon-avatar gx-mr-2" /> */}
            <Icon className="gx-mr-2" type="user" />
            <span className="gx-font-weight-light">Chuyên gia của Viezon</span>
          </div>
        </div>
      </div>
      <p
        className="gx-font-weight-light"
        style={{ color: '#404272', lineHeight: '1.5' }}
      >
        {profile.description}
      </p>
    </div>
  );
});

Index.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Index;
