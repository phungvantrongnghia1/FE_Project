import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Item from '../item';
import Title from '../title';
import 'slick-carousel/slick/slick.less';
import 'slick-carousel/slick/slick-theme.less';
import './styles.less';

const Index = React.memo((props) => {
  const { data } = props;
  console.log(data);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    lazyLoad: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 50000,
    pauseOnHover: true
  };
  /**
   * @function showSlideCourse
   * @param {*} data
   * @summary Show Course By Slide
   */
  const showSlideDocs = (data) => {
    console.log('data', data)
    let result = null;
    if (data && data.length > 0) {
      result = data.map((item, index) => {
        return (
          <Item
            key={index}
            value={item}
            direction="gx-flex-row gx-course-featured"
            courseImg="course-img"
            courseBody="course-body"
          />
        );
      });
    }
    console.log('result', result)
    return result;
  };

  return (
    <div className="featured-courses  mobile-hidden gx-mt-3">
      <Title
        title={props.title}
        subTitle="Document"
      />
      <Slider {...settings}>{showSlideDocs(data)}</Slider>
    </div>
  );
});

Index.propTypes = {
  data: PropTypes.array.isRequired
};

export default Index;
