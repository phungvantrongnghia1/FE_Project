import React, { useMemo } from 'react';
import { Drawer, Avatar, Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';
import UserProfile from '../UserProfile';
import TopServices from '../TopServices';
import './styles.less';

const { SubMenu } = Menu;

const Index = React.memo((props) => {
  const {
    visible,
    onVisible,
    carts,
    authUser,
    handleUserMenu,
    cartTotal,
    loaderComponent,
    onDelItemCart,
    onShowLogin,
    listCourseCate
  } = props;
  const _onShowLogin = (boolean) => {
    onShowLogin(boolean);
    onVisible(!boolean);
  };

  const title = useMemo(() => {
    let result = (
      <div>
        <div className="gx-mb-1 header-title-drawer gx-flex-row gx-justify-content-start gx-align-items-center">
          {authUser ? (
            <>
              <Avatar src={authUser.image && authUser.image} size={30} />
              <div className="content-title gx-flex-column gx-ml-2">
                <UserProfile
                  handleUserMenu={handleUserMenu}
                  authUser={authUser}
                />
              </div>
            </>
          ) : (
            <>
              <Avatar icon="user" size={30} />
              <div className="content-title gx-flex-column gx-ml-2">
                <span
                  onClick={() => _onShowLogin(true)}
                  className="gx-text-white gx-fs-sm"
                >
                  Đăng nhập
                </span>
                <span className="gx-text-white gx-fs-sm">
                  Để nhận thêm nhiều ưu đãi
                </span>
              </div>
            </>
          )}
        </div>
        <div className="gx-mt-3 gx-mb-2">
          <TopServices
            type="drawer"
            authUser={authUser}
            carts={carts}
            cartTotal={cartTotal}
            loaderComponent={loaderComponent}
            onDelItemCart={onDelItemCart}
          />
        </div>
      </div>
    );
    return result;
  }, [authUser]);

  const itemCateCourses = useMemo(() => {
    let result = [];
    if (listCourseCate.length > 0) {
      result = listCourseCate.map((cateParent, idx) => {
        if (cateParent.childrens) {
          return (
            <Menu.SubMenu
              className="sub-padding-left"
              key={`${idx}`}
              title={cateParent.title}
              popupClassName="header-menu"
            >
              {cateParent.childrens.map((child) => (
                <Menu.Item key={`${child.id}${Math.random(100)}`}>
                  <Link to={`/course?c=${child.id}&f=moi-nhat`}>
                    {child.title}
                  </Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          );
        } else {
          return (
            <Menu.Item key={idx}>
              <Link to={`/course?c=${cateParent.id}&f=moi-nhat`}>
                {cateParent.title}
              </Link>
            </Menu.Item>
          );
        }
      });
    }
    return result;
  }, [listCourseCate]);

  return (
    <div className="dr-wrapper">
      <Drawer
        className="dr-mobile"
        title={title}
        placement="left"
        closable={false}
        onClose={() => onVisible(false)}
        visible={visible}
      >
        <div className="dr-content-wrapper">
          <div className="dr-content-1 gx-border-bottom">
            <div className="dr-content-pd">
              <div className="gx-py-2">
                <Link to="/">
                  <Icon type="home" /> Trang chủ
                </Link>
              </div>
              <div className="gx-py-2 dr-menu">
                <Menu
                  style={{ width: '100%' }}
                  defaultOpenKeys={['sub1']}
                  className="gx-py-0"
                  mode="inline"
                >
                  <SubMenu
                    key="sub1"
                    title={
                      <span className="gx-text-primary">
                        <Icon
                          className="gx-d-flex gx-align-self-center"
                          type="profile"
                        />
                        Danh mục khóa học
                      </span>
                    }
                  >
                    {itemCateCourses}
                  </SubMenu>
                </Menu>
              </div>
            </div>
          </div>
          {/* group 2 */}
          <div className="dr-content-1">
            <div className="dr-content-pd">
              <div className="gx-py-1">
                <h5>KHÓA HỌC</h5>
              </div>
              <div className="gx-py-2">
                <Link to={`/course?c=0&f=moi-nhat`}>- Mới nhất</Link>
              </div>
              <div className="gx-py-2">
                <Link to={`/course?c=0&f=binh-chon-nhieu-nhat`}>
                  - Đánh giá cao
                </Link>
              </div>
              <div className="gx-py-2">
                <Link to={`/course?c=0&f=mua-nhieu`}>- Bán chạy</Link>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
});

export default Index;
