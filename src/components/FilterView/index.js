import React from "react";
import { Select } from "antd";
import { Icon } from "antd";
import { PropTypes } from "prop-types";
import "./style.less";
const { Option } = Select;
const index = props => {
  const handleChange = value => {
    props.checkFilterView(value);
  };
  return (
    <>
      <Select
        className="select-view"
        defaultValue="vertical"
        onChange={handleChange}
        style={{ width: 125, color: "#404272" }}
      >
        <Option style={{ color: "#404272" }} icon="" value="vertical">
          <Icon type="plus" /> Dạng lưới
        </Option>
        <Option style={{ color: "#404272" }} value="horizontal">
          <Icon type="unordered-list" /> Danh sách
        </Option>
      </Select>
    </>
  );
};
index.propTypes = {
  checkFilterView: PropTypes.func.isRequired
};
export default index;
