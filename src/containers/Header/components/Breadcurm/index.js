import React from 'react'
import { Breadcrumb, Icon } from 'antd';
import { Link } from "react-router-dom";
import "./style.less";
const routes = [
    {
        path: '',
        breadcrumbName: 'home',
        icon: 'home'
    },
    {
        path: 'first',
        breadcrumbName: 'My docs',
        icon: 'file-pdf'
    }
];

export default function index() {
    const itemRender = (route, params, routes, paths) => {
        return <Link to={paths.join('/')}><Icon className="gx-font-weight-bold" type={route.icon} /> {route.breadcrumbName}</Link>
    }

    return (
        <div className="brandcurm_box">
            <Breadcrumb separator={<Icon type="double-right" />} className="gx-my-3 brandcurm gx-pb-2 gx-mx-auto" itemRender={itemRender} routes={routes} />
        </div>
    )
}
