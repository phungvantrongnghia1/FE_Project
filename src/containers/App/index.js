import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainApp from './MainApp';
import 'assets/vendors/style';
import 'assets/styles-less/wieldy.less';
import 'moment/locale/vi';

const Index = props => {


  return (
      <Switch>
        <Route path={`${props.match.url}`} component={MainApp} />
      </Switch>
  );
};

export default Index;
