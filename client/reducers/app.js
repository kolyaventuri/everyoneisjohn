// @flow

import {SOUND, ON} from '../constants/settings';
import {CONNECTING} from '../constants/connection-status';
import {get} from '../utils/local-storage';
import {AppStateType, ActionType} from './types';

export const defaultState = {
  error: null,
  sound: get(SOUND) === ON,
  connection: {
    status: CONNECTING
  }
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
    case 'SET_SOUND':
      return {
        ...state,
        sound: payload.sound
      };
    case 'SET_CONNECTION_STATUS':
      return {
        ...state,
        connection: {
          status: payload.status
        }
      };
    default:
      return state;
  }
};

export default AppReducer;
