import React, { useState } from "react";
import { Input } from "antd";
import PropTypes from "prop-types";

const Index = React.memo(props => {
  const [value, setValue] = useState("");

  const _onChangeValue = e => setValue(e.target.value);

  const _onKeyEnter = e => {
    if (e.ctrlKey && e.keyCode == 13) {
      setValue(`${value}\n`);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      props.onSubmit(value);
      setValue("");
    }
  };

  return (
    <Input.TextArea
      onKeyDown={_onKeyEnter}
      value={value}
      onChange={_onChangeValue}
      rows={props.rows}
      className="vz-custom-txt"
      placeholder={props.placeholder}
    />
  );
});

Index.propTypes = {
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number
};

Index.defaultProps = {
  placeholder: "Nhập ghi chú của bạn tại đây",
  rows: 3
}

export default Index;
