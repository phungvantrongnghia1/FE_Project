import React, { useMemo } from 'react';
import { Switch } from 'react-router-dom';
import { PureRoute, AuthorizedRoute } from 'base/helper/Route';
import { routes } from './routes';

const App = () => {
  const renderRoutes = (routes) => {
      return routes.map((route, index) => {
        if (route.meta.authRequired) {
          return (
            <AuthorizedRoute
              key={index}
              exact={route.exact}
              path={route.path}
              component={route.main}
              meta={route.meta}
            />
          );
        } else {
          return (
            <PureRoute
              key={index}
              exact={route.exact}
              path={route.path}
              component={route.main}
              meta={route.meta}
            />
          );
        }
      });
    },
    elmRoutes = useMemo(() => renderRoutes(routes), [routes]);
  return (
    <div>
      <Switch>{elmRoutes}</Switch>
    </div>
  );
};

export default App;
