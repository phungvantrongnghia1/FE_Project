import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Error404 = ({ msg, btnText, link, isShow404, className }) => (
  <div className={`gx-page-error-container ${className && className}`}>
    <div className="gx-page-error-content gx-md-pt-0 gx-pt-3">
      {isShow404 && <div className="gx-error-code gx-mb-4">...</div>}
      <h2 className="gx-text-center">
        <span>{msg || 'Trang không tìm thấy'}</span>
      </h2>
      <p className="gx-text-center">
        <Link className="gx-btn gx-btn-primary" to={link || '/'}>
          {btnText || 'Quay lại trang trước'}
        </Link>
      </p>
    </div>
  </div>
);

Error404.propTypes = {
  msg: PropTypes.string,
  btnText: PropTypes.string,
  link: PropTypes.string,
  isShow404: PropTypes.bool
};

Error404.defaultProps = {
  isShow404: true
};

export default Error404;
