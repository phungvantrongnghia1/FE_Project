import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PureRoute = (props) => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(renderProps) => {
        return <Component meta={rest.meta} {...renderProps} />;
      }}
    />
  );
};

export const AuthorizedRoute = (props) => {
  const { component: Component, ...rest } = props,
    { authUser } = useSelector((state) => state.AuthReducer);
  return (
    <Route
      {...rest}
      render={(renderProps) => {
        if (!!authUser) return <Component meta={rest.meta} {...renderProps} />;
        return <Redirect to="/" />;
      }}
    />
  );
};
