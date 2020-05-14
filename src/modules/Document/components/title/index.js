import React from 'react';
import {Icon} from "antd";
const Index = (props) => {
    return (
        <h5 className="gx-py-2 gx-m-0 gx-font-weight-bold"><Icon className="gx-mr-2" type="double-right" />{props.title}</h5>
    )
}
export default Index;