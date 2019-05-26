// @flow

import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import {createLogger} from 'redux-logger';
import {createBrowserHistory} from 'history';
import ReactGA from 'react-ga';

import createRootReducer from './reducers';

import type {GameStateType} from './apps/game';

export const history = createBrowserHistory();
history.listen(location => {
  ReactGA.set({page: location.pathname});
  ReactGA.pageview(location.pathname);
});

export function configureStore(initialState: GameStateType = {}) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [
    routerMiddleware(history)
  ];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  return createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  );
}

export const store = configureStore();
