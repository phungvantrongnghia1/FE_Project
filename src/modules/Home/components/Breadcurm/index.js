import React from 'react'
import { Breadcrumb, Icon } from 'antd';
import { Link } from "react-router-dom";
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
        <Breadcrumb separator={<Icon type="double-right" />} className="gx-my-3" itemRender={itemRender} routes={routes} />
    )
}
