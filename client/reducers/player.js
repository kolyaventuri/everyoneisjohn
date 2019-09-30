// @flow

import deepMerge from 'deepmerge';

import type {PlayerStateType, ActionType} from './types';

const setInfo = (state: PlayerStateType, payload: {[string]: any}): PlayerStateType => {
  const result = deepMerge(state, payload);

  if (payload.skills) {
    // Ensure that if skills are set, they are not deep-cloned
    result.skills = payload.skills;
  }

  return result;
};

const PlayerReducer = (state: PlayerStateType = {}, action: ActionType): PlayerStateType => {
  const {type, payload} = action;

  switch (type) {
    case 'SET_PLAYER_INFO':
      return setInfo(state, payload);
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
