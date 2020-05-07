import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import './styles.less';

const settings = {
  dots: true,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  vertical: true,
  verticalSwiping: true,
  swipeToSlide: true,
  autoplay: true,
  autoplaySpeed: 5000
};
const Index = (props) => {
  const { data } = props;
  const showItem = (data) => {
      let result = (
        <Link to="/">
          <img
            src={require('assets/images/productTest/gioithieu.png')}
            width="100%"
            height="auto"
            style={{ minHeight: '100%' }}
          />
        </Link>
      );
      if (data.length > 0) {
        result = data.map((item, index) => (
          <Link key={index} to={'/'}>
            <img
              src={`${item.image}`}
              className="img-ads"
              onError={(e) =>
                (e.target.src = require('assets/images/productTest/gioithieu.png'))
              }
              width="100%"
              style={{ minHeight: '100%' }}
            />
          </Link>
        ));
      }
      return result;
    },
    elmItem = useMemo(() => showItem(data), [data]);

  return (
    <Slider className="vz-slider gx-mb-0 vz-banner-adv" {...settings}>
      {elmItem}
    </Slider>
  );
};

Index.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      image: PropTypes.string
    })
  )
};

export default Index;
