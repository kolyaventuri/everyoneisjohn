// @flow

import {store} from '../../store';

import type {PlayerStateType} from '../../reducers/types';

const setPlayers = (players: Array<PlayerStateType>) => {
  store.dispatch({
    type: 'SET_PLAYERS',
    payload: {players}
  });
};

export default setPlayers;
