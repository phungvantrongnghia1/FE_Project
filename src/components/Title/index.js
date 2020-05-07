import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import './styles.less';


const Index = (props) => {
    const {title, subTitle} = props;
    return (
        <div>
            {subTitle 
            ? <Tooltip
                // title={<span className="gx-font-weight-semi-bold">{subTitle}</span>}
                placement="topLeft"
                overlayClassName="title-tooltip"
            >
                <h3 className="title gx-text-success gx-font-weight-semi-bold">{title}</h3>
            </Tooltip>
            : <h3 className="title gx-text-success gx-font-weight-semi-bold">{title}</h3>
            }
        </div>
    );
};

Index.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string
};

export default Index;