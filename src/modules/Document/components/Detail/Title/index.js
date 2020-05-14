import React from 'react';
import { Icon } from 'antd';
const Index = (props) => {
  return (
    <div>
      <span className="gx-font-weight-bold gx-fs-xxxl">{props.title}</span>{' '}
      <span className="gx-ml-2 gx-p-1 gx-bg-danger gx-text-white">PDF</span>
      <div className="_icon gx-mt-2">
        <span>
          <Icon type="eye" /> 500
        </span>
        <span className="gx-mx-4">
          <Icon type="download" /> 100
        </span>
        <span>
          <Icon type="share-alt" /> 20
        </span>
      </div>
    </div>
  );
};
export default Index;
