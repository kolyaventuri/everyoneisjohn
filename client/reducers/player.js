// @flow

import type {PlayerStateType, ActionType} from './types';

const PlayerReducer = (state: PlayerStateType = {}, action: ActionType): PlayerStateType => {
  const {type, payload} = action;

  switch (type) {
    case 'SET_PLAYER_INFO':
      return {
        ...state,
        ...payload
      };
    case 'SET_PLAYER_NAME':
      return {
        ...state,
        name: payload.name
      };
    default:
      return state;
  }
};

export default PlayerReducer;
