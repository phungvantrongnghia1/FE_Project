import React, { useMemo } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import Progress from 'utils/CircularProgress';
import CustomScrollbars from 'utils/CustomScrollbars';
import ItemCart from './Item';
import TotalPrice from 'components/PriceView/TotalPrice';
const Index = React.memo(props => {
  const { source, loader } = props;
  const _onDelItemCart = id => props.onDelItemCart(id);

  /**
   * @function showItemCart
   * @param {*} data
   * @summary Show item on shopping cart. If no item , show empty cart
   */
  const showCart = data => {
      let result = null;
      if (data && data.length > 0) {
        result = (
          <>
            <div className={`gx-p-3 gx-flex-column ${loader ? 'gxx-opacity' : ''}`}>
              <div className="gx-flex-row gx-align-items-center gx-mb-2">
                <Icon className="gx-fs-lg gx-mr-2" type="check-circle" theme="filled" style={{ color: '#3DB166' }} />
                <span className="gx-font-weight-bold" style={{ color: '#404272', fontSize: '18px' }}>
                  Đã thêm vào giỏ hàng
                </span>
              </div>
              <CustomScrollbars
                className="vz-popover-scroll"
                style={{ height: +data.length >= 3 ? '215px' : `${215 / (3 / data.length)}px` }}
              >
                <ul className="gx-sub-popover">
                  {data.map(item => {
                    return <ItemCart key={item.id} item={item} onDelItemCart={id => _onDelItemCart(id)} />;
                  })}
                </ul>
              </CustomScrollbars>

              <div className="gx-flex-row gx-justify-content-between">
                <div className="gx-flex-column">
                  <span className="gx-fs-sm gx-mb-1 gx-mt-1" style={{ color: '#404272' }}>
                    Tổng:
                  </span>
                  <h3 className="gx-fs-md gx-mb-0 gx-text-success gx-font-weight-bold">
                    <TotalPrice data={data} />
                  </h3>
                </div>
                <Link to={'/cart'} className="gx-btn gx-btn-warning gx-mb-0 gx-mt-2">
                  Thanh toán
                </Link>
              </div>
            </div>
            {loader ? (
              <div className="st-loader-shopping-cart">
                <Progress className="gx-h-100" />
              </div>
            ) : (
              <></>
            )}
          </>
        );
      } else {
        result = (
          <div className="gx-p-3 gx-flex-column gx-text-center">
            <p className="gx-text-dark">Giỏ hàng đang trống</p>
            <Link to="/course/list?c=c0&f=moi-nhat" className="">
              <u>Khám phá khóa học Viezon ngay</u>
            </Link>
          </div>
        );
      }
      return result;
    },
    elmCart = useMemo(() => showCart(source), [source, loader]);

  return <div>{elmCart}</div>;
});

export default Index;
