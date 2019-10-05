// @flow

import {store} from '../store';

type ConnectionStatus = 'connecting' | 'connected' | 'failing' | 'failed';

const setConnectionStatus = (status: ConnectionStatus) => store.dispatch({
  type: 'SET_CONNECTION_STATUS',
  payload: {
    status
  }
});

export default setConnectionStatus;
