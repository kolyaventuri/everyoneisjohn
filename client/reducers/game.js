// @flow

import type {GameStateType, ActionType} from './types';

const GameReducer = (state: GameStateType = {}, action: ActionType): GameStateType => {
  const {type, payload} = action;

  switch (type) {
    case 'SET_GAME_GM':
      return {
        ...state,
        gameId: payload.gameId,
        isGm: true
      };
    default:
      return state;
  }
};

export default GameReducer;
