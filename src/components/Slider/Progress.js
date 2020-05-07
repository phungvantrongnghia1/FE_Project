import React, { useState, useEffect, useRef } from "react";
import { Progress } from "antd";

const Slider = React.memo(props => {
  const { speed, indexActive } = props;
  let [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent(0);
    const interval = setInterval(() => {
      setPercent(percent => percent + 2);
    }, speed / 50);
    return () => clearInterval(interval);
  }, [indexActive]);
  return (
    <Progress strokeWidth={3} showInfo={false} percent={percent} size="small" />
  );
});

export default Slider;
