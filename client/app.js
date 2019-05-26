// @flow

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import ReactGA from 'react-ga';

import {store} from './store';
import RouteController from './route-controller';

/* eslint-disable import/no-unassigned-import */
import './socket';
import './app.scss';
import './utils/error-trap';
/* eslint-enable import/no-unassigned-import */

ReactGA.initialize(process.env.GA_TRACKING);

render(
  <Provider store={store}>
    <RouteController/>
  </Provider>
  // $FlowFixMe
  , document.querySelector('#app'));

// $FlowFixMe
if (module.hot) {
  module.hot.accept();
}
