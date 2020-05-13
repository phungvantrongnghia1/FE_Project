import React from 'react';
import asyncComponent from 'utils/asyncComponent';
const Home = asyncComponent(() => import('modules/Home/pages'));

export const routes = [
    {
        name: 'app',
        path: '/',
        exact: true,
        main: ({ match, ...rest }) => <Home match={match} {...rest} />,
        meta: {
            authRequired: false,
            hideHeader: false,
            hideFooter: false
        }
    }
];
