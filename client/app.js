// @flow

import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import ReactGA from 'react-ga';

import {store, history} from './store';
import App from './components/app';

/* eslint-disable import/no-unassigned-import */
import './socket';
import './app.scss';
import './utils/error-trap';
/* eslint-enable import/no-unassigned-import */

ReactGA.initialize(process.env.GA_TRACKING);

class Routes extends React.Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <Router history={history}>
          <App/>
        </Router>
      </ConnectedRouter>
    );
  }
}

render(
  <Provider store={store}>
    <Routes/>
  </Provider>
  // $FlowFixMe
  , document.querySelector('#app'));

// $FlowFixMe
if (module.hot) {
  module.hot.accept();
}
