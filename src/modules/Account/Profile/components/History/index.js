import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import { NotificationManager } from 'react-notifications';
import { addReview } from 'modules/Account/redux/actions';
import Item from './Item/Item';
import NotFound from 'components/Error';
import PopupReview from 'components/PopupReview';

const Index = React.memo((props) => {
  const { coursesPurchased } = useSelector((state) => state.CourseReducer),
    [visible, setVisible] = useState(false),
    [loadingReview, setLoadingReview] = useState(false),
    [courseIDToReview, setCourseIDToReview] = useState(-1),
    dispatch = useDispatch();

  const showItem = (data) => {
      let result = (
        <NotFound
          className="profile-history"
          isShow404={false}
          msg="Bạn chưa có khóa học nào"
          link="/course/list?c=0&f=moi-nhat"
          btnText="Khám phá các khóa học"
        />
      );
      if (data.length > 0) {
        result = data.map((item) => (
          <div key={item.id}>
            <Item item={item} getCourseId={() => getCourseId(item.course_id)} />
          </div>
        ));
      }
      return result;
    },
    elmItem = useMemo(
      () => showItem(coursesPurchased.data ? coursesPurchased.data : []),
      [coursesPurchased]
    );

  const _chagePage = (page) => {
    props.onGetListCoursePurchased(`page=${page}`);
  };

  /********* popupview ********/
  const handleSubmitReview = (data) => {
    data.course_id = courseIDToReview;
    setLoadingReview(true);
    dispatch(
      addReview({
        data,
        cbError: () => {
          NotificationManager.warning('Không thể thêm nhận xét', '', 5000);
        },
        cbSuccess: () => {
          NotificationManager.success('Nhận xét đang chờ phê duyệt', '', 5000);
        },
        cbLoader: () => {
          setVisible(false);
          setLoadingReview(false);
        }
      })
    );
  };

  const onVisibleModal = (boolean) => setVisible(boolean);

  const getCourseId = (id) => {
    setCourseIDToReview(id);
    onVisibleModal(true);
  };

  return (
    <div className="gx-mt-3 history">
      {elmItem}
      <div className="gx-d-flex gx-justify-content-center gx-align-items-center">
        {coursesPurchased &&
          coursesPurchased.data &&
          coursesPurchased.data.length > 0 && (
            <>
              <Pagination
                className="vz-custom-pagination"
                current={coursesPurchased.page || 1}
                onChange={_chagePage}
                pageSize={
                  coursesPurchased.perPage ? coursesPurchased.perPage : 4
                }
                total={coursesPurchased.total && coursesPurchased.total}
              />
              <PopupReview
                visible={visible}
                loading={loadingReview}
                onVisibleModal={(boolean) => onVisibleModal(boolean)}
                callbackSubmit={(data) => handleSubmitReview(data)}
              />
            </>
          )}
      </div>
    </div>
  );
});

export default Index;
