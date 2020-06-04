import React from 'react';
import asyncComponent from 'utils/asyncComponent';
const Home = asyncComponent(() => import('modules/Home/pages'));
const Document = asyncComponent(() => import('modules/Document/pages'));
const DocumentDetail = asyncComponent(() => import('modules/Document/pages/detail'));
const Profile = asyncComponent(() => import('modules/Account/Profile'));
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
    },
    {
        name: 'docsd',
        path: '/document',
        exact: true,
        main: ({ match, ...rest }) => <Document match={match} {...rest} />,
        meta: {
            authRequired: false,
            hideHeader: false,
            hideFooter: false
        }
    },
    {
        name: 'profile',
        path: '/profile',
        exact: true,
        main: ({ match, ...rest }) => <Profile match={match} {...rest} />,
        meta: {
            authRequired: false,
            hideHeader: false,
            hideFooter: false
        }
    }
];
