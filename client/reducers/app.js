// @flow

import {SOUND, ON} from '../constants/settings';
import {get} from '../utils/local-storage';
import {AppStateType, ActionType} from './types';

export const defaultState = {
  error: null,
  sound: get(SOUND) === ON
};

const AppReducer = (state: AppStateType = defaultState, action: ActionType): AppStateType => {
  const {type, payload} = action;

  switch (type) {
    case 'SET_ERROR':
      return {
        ...state,
        error: {
          error: payload.error,
          type: payload.type
        }
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default AppReducer;
