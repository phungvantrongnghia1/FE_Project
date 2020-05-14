import React from 'react';
import asyncComponent from 'utils/asyncComponent';
const Home = asyncComponent(() => import('modules/Home/pages'));
const DocumentDetail = asyncComponent(() => import('modules/Document/pages/detail'));
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
    },
    {
        name: 'docsd',
        path: '/document-detail/:id',
        exact: true,
        main: ({ match, ...rest }) => <DocumentDetail match={match} {...rest} />,
        meta: {
            authRequired: false,
            hideHeader: false,
            hideFooter: false
        }
    }
];
