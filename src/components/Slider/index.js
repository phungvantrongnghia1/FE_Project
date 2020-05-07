import React, { useMemo, useState } from 'react';
import { Carousel } from 'antd';
import Progress from './Progress';
import './slider.less';

const Slider = React.memo((props) => {
  const { data } = props,
    autoplaySpeed = 5000,
    [indexActive, setIndexActive] = useState(0);

  const showSlider = (data) => {
      let result = (
        <div className="gx-position-relative">
          <img
            className="slider-img"
            width="100%"
            alt="slider"
            src={require('assets/images/slider.png')}
          />
        </div>
      );
      if (data.length > 0) {
        result = data.map((item, index) => (
          <div key={index} className="gx-position-relative">
            <a href={item.url}>
              <img
                className="slider-img"
                width="100%"
                alt="slider"
                src={`${item.image}`}
                onError={(e) =>
                  (e.target.src = require('assets/images/slider.png'))
                }
              />
            </a>
          </div>
        ));
      }
      return result;
    },
    elmSlider = useMemo(() => showSlider(data), [data]);
  const _onChangeSlie = (key) => setIndexActive(key);

  return (
    <div className="slider-wrapper gx-position-relative">
      <Carousel
        autoplaySpeed={autoplaySpeed}
        autoplay
        effect="fade"
        afterChange={_onChangeSlie}
      >
        {elmSlider}
      </Carousel>
      <div className="vz-progess-bar gx-position-absolute gx-w-100 gx-h-100">
        <div className="vz-content-progress gx-position-absolute gx-w-100 gx-flex-row gx-justify-content-center">
          <Progress indexActive={indexActive} speed={autoplaySpeed} />
        </div>
      </div>
    </div>
  );
});

export default Slider;
