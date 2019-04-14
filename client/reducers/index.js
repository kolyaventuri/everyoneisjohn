// @flow

import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import game from './game';
import player from './player';

export default (history: {[string]: any}) => combineReducers({
  router: connectRouter(history),
  game,
  player
});
