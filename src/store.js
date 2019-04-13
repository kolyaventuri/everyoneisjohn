// @flow

import {createBrowserHistory} from 'history';
import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import createRootReducer from './reducers';

import type {GameStateType} from './apps/game';

export const history = createBrowserHistory();

export function configureStore(initialState: GameStateType = {}) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      )
    )
  );
}

export const store = configureStore();
