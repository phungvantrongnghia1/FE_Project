import React, { useMemo } from 'react';
import { Rate, Icon, Progress, Button } from 'antd';
import { Link } from 'react-router-dom';
import './styles.less';

const Item = (props) => {
  const { item, getCourseId } = props;
  const calPercentStudied = (total, studied) => {
    let result = 1;
    if (!!studied) result = (+studied / +total) * 100;
    return result;
  };

  const _onShowReview = () => getCourseId();

  const showBtnFooter = (data) => {
      let result = (
        <Button
          onClick={() => _onShowReview()}
          className="gx-btn-warning gx-px-4 gx-font-weight-semi-bold vz-btn-review"
        >
          Đánh giá
        </Button>
      );
      if (!!data.course.total_lessons) {
        if (
          data.course.total_lessons === data.course.total_studied_lesson &&
          data.course.reviews.length > 0
        ) {
          result = null;
        }

        if (data.course.total_lessons !== data.course.total_studied_lesson) {
          const idCurrent = !!data.study_current
            ? JSON.parse(data.study_current).id
            : 0;
          result = (
            <Button
              href={`/learning/${data.course.id}/${idCurrent}`}
              className="gx-btn-warning gx-px-4 gx-font-weight-semi-bold vz-btn-review"
            >
              Tiếp tục học
            </Button>
          );
        }
      } else {
        result = (
          <Button className="gx-btn-danger gx-px-4 gx-font-weight-semi-bold vz-btn-review">
            Khóa học lỗi
          </Button>
        );
      }

      return result;
    },
    elmButtonFooter = useMemo(() => showBtnFooter(item), [item]);

  const showImgCer = (totalLesson, totalLessonStudied) => {
      return (
        <img
          className="vz-img-certificate"
          alt="Viezon"
          src={
            totalLesson === totalLessonStudied && totalLesson !== 0
              ? require('assets/images/complete.svg')
              : require('assets/images/studing.svg')
          }
        />
      );
    },
    elmImgCer = useMemo(
      () =>
        showImgCer(item.course.total_lessons, item.course.total_studied_lesson),
      [item]
    );

  return (
    <div className={`gx-product-item gx-product-horizontal vz-history`}>
      <div className="gx-product-image">
        <div className="gx-grid-thumb-equal">
          <span className="gx-grid-thumb-cover">
            {!!item.course.total_lessons ? (
              <Link
                to={`/learning/${item.course.id}/${
                  !!item.study_current ? JSON.parse(item.study_current).id : 0
                }`}
              >
                <img
                  alt="Viezon"
                  src={item.course.image}
                  onError={(e) =>
                    (e.target.src = require('assets/images/productTest/product_1.png'))
                  }
                />
              </Link>
            ) : (
              <img
                alt="Viezon"
                src={item.course.image}
                onError={(e) =>
                  (e.target.src = require('assets/images/productTest/product_1.png'))
                }
              />
            )}
          </span>
        </div>
      </div>
      <div className="gx-product-body">
        <h3 className="gx-product-title">
          {!!item.course.total_lessons ? (
            <Link
              to={`/learning/${item.course.id}/${
                !!item.study_current ? JSON.parse(item.study_current).id : 0
              }`}
            >
              {item.course.title}
            </Link>
          ) : (
            <span className="gx-text-danger">{item.course.title}</span>
          )}
        </h3>
        <div className="ant-row-flex">
          <p className="course-name gx-text-grey gx-font-italic gx-mb-0">
            {`${item.course.contributor.title} | ${
              item.course.contributor.major || 'Giáo viên'
            }`}
          </p>
        </div>
        {/* <p className="gx-fs-xs">{item.description}</p> */}
        <div className="course-status ant-row-flex gx-align-items-center gx-fs-xs">
          <div className="course-lession gx-d-flex gx-flex-row gx-align-items-center">
            <Icon
              theme="filled"
              className="gx-text-grey gx-mr-2"
              type="play-circle"
            />
            <span className="gx-text-grey gx-pr-2 gx-mb-0 gx-font-weight-light">
              {item.course.videos || 0} videos
            </span>
          </div>
          <div className="course-time gx-d-flex gx-flex-row gx-align-items-center">
            <Icon
              theme="filled"
              className="gx-text-grey gx-mr-2"
              type="clock-circle"
            />
            <span className="gx-text-grey gx-mb-0 gx-pr-2 gx-font-weight-light">
              {item.course.hours || 0} giờ
            </span>
          </div>
          <div className="course-view gx-d-flex gx-flex-row gx-align-items-center">
            <Icon theme="filled" className="gx-text-grey gx-mr-2" type="eye" />
            <span className="gx-text-grey gx-mb-0 gx-pr-2 gx-font-weight-light">
              {item.course.views || 0} lượt xem
            </span>
          </div>
          <div className="course-rate gx-d-flex gx-flex-row gx-align-items-center gx-mb-1">
            <Rate
              className="gx-text-orange gx-fs-xs"
              allowHalf
              disabled
              defaultValue={item.course.rate || 1}
            />
            <span className="gx-d-flex gx-text-grey gx-align-items-center gx-ml-1">
              <i>{`(${item.course.total_rate || 1} lượt đánh giá)`}</i>
            </span>
          </div>
        </div>
      </div>

      <div className="gx-product-footer gx-flex-column">
        <div className="gx-grid-thumb-equal gx-mb-1 mobile-hidden">
          <span className="gx-grid-thumb-cover">{elmImgCer}</span>
        </div>
        {elmButtonFooter}
      </div>

      <div className="vz-progress">
        <Progress
          strokeWidth={4}
          showInfo={false}
          percent={calPercentStudied(
            item.course.total_lessons,
            item.course.total_studied_lesson
          )}
          size="small"
        />
      </div>
    </div>
  );
};

export default Item;
