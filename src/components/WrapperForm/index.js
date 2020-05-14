import React from "react";
import { Button, Icon, Card } from "antd";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import "./style.less";

const Index = React.memo(props => {
  const { title, children, onSubmit, onCancel } = props;
  const {loadingBTN} = useSelector(state => state.GeneralReducer);
  const _onBack = () => {
    props.history.goBack();
  };
  return (
    <Card>
      <div className="wrap-form">
        <div className="gx-page-title gx-flex-row gx-align-items-center gx-justify-content-between gx-border-bottom gx-mb-3">
          <h5 className="gx-text-uppercase">{title}</h5>
          <Button className="gx-btn-orange" onClick={_onBack}>
            <Icon type="rollback" />
            Quay lại
          </Button>
        </div>
      </div>

      <div className="main-form">{children}</div>
      <div className="wrap-footer-form">
        <div className="gx-d-flex gx-justify-content-start gx-ml-3 form-button">
          <Button type="primary" loading={loadingBTN} onClick={onSubmit}>
            <Icon type={title  === "Duyệt đơn hàng" ? "check" : "download"} />
            {title  === "Duyệt đơn hàng" ? "Duyệt" : "Duyệt"}
          </Button>
          <Button type="warning" onClick={onCancel}>
            <Icon type="redo" />
            Bỏ qua
          </Button>
        </div>
      </div>
    </Card>
  );
});

Index.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default withRouter(Index);
