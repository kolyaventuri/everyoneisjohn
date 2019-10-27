// @flow

import deepMerge from 'deepmerge';

import type {GameStateType, ActionType} from './types';

const setSpecificPlayer = (state: GameStateType, {payload}: ActionType) => {
  const {players} = state;
  const index = players.findIndex(p => p.id === payload.id);
  if (index < 0) {
    return {...state};
  }

  players[index] = deepMerge(players[index], payload);
  if (payload.skills) {
    players[index].skills = payload.skills;
  }

  return {
    ...state,
    players
  };
};

const addMessage = (state: GameStateType, {payload}: ActionType) => {
  const {messages} = state;

  messages.push(payload.message);

  return {
    ...state,
    messages
  };
};

const GameReducer = (state: GameStateType = {}, action: ActionType): GameStateType => {
  const {type, payload} = action;

  switch (type) {
    case 'SET_GAME_GM':
      return {
        ...state,
        gameId: payload.gameId,
        isGm: true
      };
    case 'SET_GAME_ID':
      return {
        ...state,
        gameId: payload.gameId,
        isGm: false
      };
    case 'SET_PLAYERS':
      return {
        ...state,
        players: payload.players
      };
    case 'SET_GAME_PLAYER_INFO':
      return setSpecificPlayer(state, action);
    case 'SET_GAME_MODE':
      return {
        ...state,
        mode: payload.mode
      };
    case 'ADD_MESSAGE':
      return addMessage(state, action);
    default:
      return state;
  }
};

export default GameReducer;
