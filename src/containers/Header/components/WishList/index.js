import React, { useMemo } from 'react';
import { Icon } from 'antd';
import ItemCourse from 'modules/eCommerce/Course/components/Item/Item';
import CustomScrollbars from 'utils/CustomScrollbars';
import './styles.less';

const Index = React.memo(props => {
  const { source } = props;

  const showItem = data => {
      let result = (
        <div className="gx-p-3 gx-flex-column gx-text-center">
          <p className="gx-text-dark">Chưa có khóa học nào</p>
        </div>
      );
      if (data && data.length > 0) {
        result = (
          <>
            <div className="gx-p-3 gx-flex-column">
              <div className="gx-flex-row gx-align-items-center gx-mb-2">
                <Icon className="gx-fs-lg gx-mr-2 gx-text-red" type="heart" />
                <span className="gx-font-weight-bold gx-fs-lg gx-text-red">Khóa học đã thích</span>
              </div>
              <CustomScrollbars
                className="vz-scroll-wishlist"
                style={{ height: +data.length >= 3 ? '230px' : `${230 / (3 / data.length)}px` }}
              >
                <ul className="gx-sub-popover">
                  {data.map(item => {
                    return (
                      <li key={item.id}>
                        <ItemCourse
                          course={item}
                          direction="gx-flex-row gx-course-horizontal item-wishlist"
                          courseImg="course-img"
                          courseBody="course-body"
                          isTooltip={false}
                          isWishlist={true}
                        />
                      </li>
                    );
                  })}
                </ul>
              </CustomScrollbars>
            </div>
          </>
        );
      }
      return result;
    },
    elmItem = useMemo(() => showItem(source), [source]);

  return <div>{elmItem}</div>;
});

export default Index;
