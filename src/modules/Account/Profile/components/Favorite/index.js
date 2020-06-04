import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Pagination } from "antd";
import NotFound from "components/Error";

const Index = React.memo(props => {
  const { coursesFavorited } = useSelector(state => state.CourseReducer);

  const showItem = data => {
      let result = (
        <NotFound
          className="profile-history"
          isShow404={false}
          msg="Bạn chưa có khóa học nào"
          link="/course/list?c=0&f=moi-nhat"
          btnText="Khám phá các khóa học"
        />
      );
      return result;
    },
    elmItem = useMemo(
      () => showItem(coursesFavorited.data ? coursesFavorited.data : []),
      [coursesFavorited]
    );
  const _chagePage = page => {
    props.onGetListCourseFavorited(`page=${page}`);
  };
  return (
    <div>
      <Row>{elmItem}</Row>
      <div className="gx-d-flex gx-justify-content-center gx-align-items-center">
        {coursesFavorited &&
          coursesFavorited.total >= coursesFavorited.perPage && (
            <Pagination
              className="vz-custom-pagination"
              current={coursesFavorited.page || 1}
              onChange={_chagePage}
              pageSize={coursesFavorited.perPage ? coursesFavorited.perPage : 4}
              total={coursesFavorited.total && coursesFavorited.total}
            />
          )}
      </div>
    </div>
  );
});

export default Index;
