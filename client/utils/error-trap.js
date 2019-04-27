// @flow

import {store} from '../store';

// eslint-disable-next-line max-params, unicorn/prefer-add-event-listener
window.onerror = (msg: string, url: string, lineNo: number, columnNo: number, error: Error) => {
  const message = [
    `Message: ${msg}`,
    `URL: ${url}`,
    `Line: ${lineNo}`,
    `Col: ${columnNo}`,
    `Error: ${error}`
  ].join('\n');

  store.dispatch({
    type: 'SET_ERROR',
    payload: {error: 'app.unhandledException'}
  });

  console.error(message);

  return true;
};
