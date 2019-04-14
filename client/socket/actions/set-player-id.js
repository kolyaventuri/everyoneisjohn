// @flow

import {store} from '../../store';

const setPlayerId = (id: string) => {
  store.dispatch({
    type: 'SET_PLAYER_ID',
    payload: {id}
  });
};

export default setPlayerId;
