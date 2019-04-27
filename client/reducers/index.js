// @flow

import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import app from './app';
import game from './game';
import player from './player';

export default (history: {[string]: any}) => combineReducers({
  router: connectRouter(history),
  app,
  game,
  player
});
