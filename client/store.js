// @flow

import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createBrowserHistory} from 'history';
import createRootReducer from './reducers';

import type {GameStateType} from './apps/game';

const logger = () => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const reduxLogger = createLogger();

  return reduxLogger;
};

export const history = createBrowserHistory();

export function configureStore(initialState: GameStateType = {}) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        thunk,
        logger()
      )
    )
  );
}

export const store = configureStore();
