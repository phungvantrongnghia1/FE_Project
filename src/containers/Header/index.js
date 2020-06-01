import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Icon, Input, Modal, Carousel } from 'antd';
import { logOut, showModalLogin } from 'modules/Account/redux/actions';
import { getDocsCate, searchDocs } from "modules/Document/redux/actions";
import { searchDocsHome } from "modules/Home/redux/actions";
import UserProfile from './components/UserProfile';
import SignIn from 'modules/Account/SignIn';
import UploadDoc from "components/UploadDoc";
import BrandCurm from "./components/Breadcurm";
import './header.less';
const { Search } = Input;

const Index = (props) => {
  const { docsCate } = useSelector(state => state.Document);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false),
    { authUser, isLogin } = useSelector((state) => state.AuthReducer),
    [showText, setShowText] = useState(false);
  const url = new URLSearchParams(location.search);
  useEffect(() => {
    dispatch(getDocsCate())
    if (url.get('t') !== null) {
      props.history.push({ search: `` })
    }
  }, [])
  const showModal = () => {
    if (authUser)
      setVisible(true);
    else _onShowLogin(true)

  };

  const handleOk = e => {
    setVisible(false)
  };
  const checkLocation = () => {
    let { pathname } = props.location;
    let patt = /document/i;
    return pathname.search(patt) >= 0 ? true : false;
  }
  checkLocation()
  const handleCancel = e => {
    setVisible(false)
  };
  const _onShowLogin = (boolean) => {
    dispatch(showModalLogin(boolean));
  };
  const toggleContent = () => {
    setShowText(!showText);
  };
  const handleUserMenu = (e) => {
    if (e.key === 'logout') {
      dispatch(logOut());
      location.reload();
    }
    if (e.key === 'profile') {
      props.history.push('/profile');
    }
  };
  const handleSearch = value => {
    props.history.push({ search: `?t=${value}` });
    let keySearch = props.location.pathname;
    if (keySearch.indexOf('document') === 1)
      dispatch(searchDocs(value))
    dispatch(searchDocsHome(value))

  }
  const handleChangeSearch = value => {

    if (value.target.value === '') {
      let keySearch = props.location.pathname;
      if (keySearch.indexOf('document') === 1)
        dispatch(searchDocs(value.target.value))
      dispatch(searchDocsHome(value.target.value))
      props.history.push({ search: `` })
    }
  }
  return (
    <>
      <Row className="header gx-px-4">
        <Col span={4} className="header_brand">
          <div className="gx-text-right">
            <Link to="/"><img style={{ width: 98 }} src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.15752-9/98204332_273603697376215_4936225893480660992_n.png?_nc_cat=100&_nc_sid=b96e70&_nc_ohc=J9pnNQa8cNwAX8toYVm&_nc_ht=scontent.fsgn2-2.fna&oh=ea37f8f910cd90f14c50f45fd4e9460b&oe=5EECA556" /></Link>
          </div>
        </Col>
        <Col span={16} className="header_nav">
          <Row>
            <Col className="left" span={14}>
              <ul className="nav gx-mb-0 gx-h-100">
                <li className={`${!checkLocation() ? "active" : ""} nav_item`}><Link to="/">Trang chủ</Link></li>
                <li className={`${checkLocation() ? "active" : ""} nav_item`}><Link to="/document">Tài liệu</Link></li>
                <li className="nav_item"><Link to="/">Liên Hệ</Link></li>
              </ul>
            </Col>
            <Col className="right" span={10}>
              <Search
                className="gx-mb-0"
                placeholder="Tìm kiếm tài liệu"
                onSearch={(value) => handleSearch(value)}
                onChange={value => handleChangeSearch(value)}
              />
            </Col>
          </Row>
        </Col>
        <Col span={4} className="header_btn">

          <Button className="gx-mb-0" type="primary" onClick={showModal}>
            <Icon type="upload" /> Tải lên
        </Button>
          <div className="gx-menu-right gx-ml-auto gx-d-sm-block gx-d-none">
            {!authUser ? (
              <Button
                className="gx-btn-warning gx-mb-0"
                onClick={() => _onShowLogin(true)}
              >
                Đăng nhập
              </Button>
            ) : (
                <UserProfile authUser={authUser} handleUserMenu={handleUserMenu} />
              )}

            <SignIn
              visible={isLogin}
              hideModal={() => _onShowLogin(false)}
              showText={showText}
              toggleContent={toggleContent}
            />
          </div>
        </Col>
      </Row>
      <div>
          <img src="https://hoctap-viezon.tuoitresoft.com/static/media/3wXdI_6.png" />
        </div>
       <BrandCurm/>       
      <Modal
        title="Tải tài liệu lên"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <UploadDoc typeAc={true} docsCate={docsCate} />
      </Modal>
    </>
  );
}

export default withRouter(Index);