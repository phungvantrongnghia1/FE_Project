import '@babel/polyfill';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { message } from 'antd';
import App from './containers/App';
import { NotificationContainer } from 'react-notifications';
import configureStore, { history } from './base/redux/store';

message.config({
  top: 100,
  maxCount: 1,
  duration: 2
});
const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
      <NotificationContainer />
    </Router>
  </Provider>,
  document.getElementById('root')
);
