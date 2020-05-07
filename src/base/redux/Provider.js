import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
const store = configureStore();
const Index = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
export default Index;
