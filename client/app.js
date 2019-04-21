// @flow

import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

import {store, history} from './store';
import App from './components/app';

/* eslint-disable import/no-unassigned-import */
import './socket';
import './app.scss';
/* eslint-enable import/no-unassigned-import */

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router history={history}>
        <App/>
      </Router>
    </ConnectedRouter>
  </Provider>
  // $FlowFixMe
  , document.querySelector('#app'));

// $FlowFixMe
if (module.hot) {
  module.hot.accept();
}
