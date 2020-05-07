import React, { useEffect, useState } from 'react';
import Nprogress from 'nprogress';
import ReactPlaceholder from 'react-placeholder';
import 'nprogress/nprogress.css';
import 'react-placeholder/lib/reactPlaceholder.css';
import CircularProgress from 'utils/CircularProgress';

const asyncComponent = importComponent => props => {
  const [component, setComponent] = useState(null);
  /**
   * @function getComponent
   * @param {*} importComponent
   * @summary get async component import
   */
  const getComponent = async importComponent => {
    const { default: Component } = await importComponent();
    Nprogress.done();
    setComponent(<Component {...props} />);
  };

  // didmount
  useEffect(() => {
    Nprogress.start();
    getComponent(importComponent);
  }, []);

  // render
  const Component = component || <CircularProgress />;
  return (
    <ReactPlaceholder type="text" rows={7} ready={Component !== null}>
      {Component}
    </ReactPlaceholder>
  );
};
export default asyncComponent;
