import React, { useMemo } from 'react';
import './styles.less';
const Index = React.memo((props) => {
  const { data } = props;

  const errUrlImg = (index) => {
    let result = require('assets/images/instructor.svg');
    if (index === 1) {
      result = require('assets/images/course-for-you.svg');
    } else if (index === 2) {
      result = require('assets/images/ready-study.svg');
    }
    return result;
  };
  const showCertificate = (data, isTrainer) => {
      let result = null;
      result = data.map((item, index) => {
        return (
          <a key={index} href={item.url}>
            <div
              key={index}
              className="gx-d-flex gx-justify-content-center gx-align-items-center"
              style={{ width: '140px' }}
            >
              {/* <i className={`${item.icon} gx-text-white gx-mr-3`}  /> */}
              <img
                onError={(e) => (e.target.src = errUrlImg(index))}
                src={item.image}
                alt={item.title}
              />
              <div className="gx-d-flex gx-flex-column">
                <span className="gx-text-white gx-fs-xxl gx-ml-2 gx-mb-0">
                  {item.title}
                </span>
              </div>
            </div>
          </a>
        );
      });
      return result;
    },
    elmCer = useMemo(() => showCertificate(data), [data]);

  return (
    <div className="gx-d-none gx-d-md-block">
      <div className="gx-certificate gx-w-100 gx-py-2 gx-d-flex">{elmCer}</div>
    </div>
  );
});

export default Index;
