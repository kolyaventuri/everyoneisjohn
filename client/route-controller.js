// @flow

import React from 'react';
import ReactGA from 'react-ga';
import {Router} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';

import {history} from './store';
import App from './components/app';

export default class RouteController extends React.Component {
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
