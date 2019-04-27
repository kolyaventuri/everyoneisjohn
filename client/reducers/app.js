// @flow

import {AppStateType, ActionType} from './types';

export const defaultState = {
  error: null
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
    default:
      return state;
  }
};

export default AppReducer;
