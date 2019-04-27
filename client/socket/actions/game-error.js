// @flow

import {store} from '../../store';
import errorMap from '../../constants/error-map';

const gameError = (errorFull: string) => {
  const parts = errorFull.split(/^error\./);
  const error = parts[1];
  const errorParts = error.split('.');

  let current = errorMap;
  let type = null;
  for (const part of errorParts) {
    if (typeof current[part] === 'object') {
      current = current[part];
    } else if (typeof current[part] === 'string') {
      type = current[part];
    } else {
      return;
    }
  }

  store.dispatch({
    type: 'SET_ERROR',
    payload: {error, type}
  });
};

export default gameError;
