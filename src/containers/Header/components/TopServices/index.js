import React from 'react';
import { Icon, Badge, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import ListCart from '../ListCart';
import WishList from '../WishList';
import './styles.less';

const Index = React.memo((props) => {
  const {
    loaderComponent,
    authUser,
    carts,
    cartTotal,
    onDelItemCart,
    type
  } = props;
  return (
    <div
      className={`gx-flex-1 ${
        authUser ? 'gx-justify-content-between' : 'gx-justify-content-around'
      } ${type === 'normal' ? 'mobile-service' : 'top-service'} `}
    >
      <div
        className={`header-like-list gx-align-self-center gx-mb-0 header-icon`}
      >
        <Tooltip
          placement="bottom"
          title={
            !!authUser && authUser.wishCourse ? (
              <WishList source={authUser.wishCourse} />
            ) : null
          }
          overlayClassName="cart-tooltip"
        >
          <Badge
            count={
              !!authUser
                ? authUser.wishlist
                  ? JSON.parse(authUser.wishlist).length
                  : 0
                : 0
            }
            className="gx-mb-0 gx-link gx-mr-0 header-icon"
          >
            <Icon type="heart" className="gx-link gx-text-danger gx-fs-xxl" />
          </Badge>
        </Tooltip>
      </div>
      <Tooltip
        placement="bottom"
        title={
          carts ? (
            <ListCart
              loader={loaderComponent}
              source={carts}
              onDelItemCart={(id) => onDelItemCart(id)}
            />
          ) : null
        }
        overlayClassName="cart-tooltip"
      >
        <Badge
          count={cartTotal ? cartTotal : 0}
          className="gx-mb-0 gx-link gx-mr-0 header-icon"
        >
          <img
            src={require('assets/images/shopping-basket.png')}
            alt="shopping-basket"
          />
        </Badge>
      </Tooltip>
      {authUser && (
        <div className="gx-align-self-center gx-align-seft-center gx-mb-0 header-icon">
          <Tooltip
            placement="bottom"
            title="Khóa học đã mua"
            overlayClassName="gx-bg-white"
          >
            <Link to="/profile">
              <Badge
                count={
                  !!authUser
                    ? authUser.bought_list
                      ? JSON.parse(authUser.bought_list).length
                      : 0
                    : 0
                }
                className="gx-mb-0 gx-link gx-mr-0 header-icon"
              >
                <Icon type="schedule" className="gx-text-primary gx-fs-xxl" />
              </Badge>
            </Link>
          </Tooltip>
        </div>
      )}
    </div>
  );
});

export default Index;
