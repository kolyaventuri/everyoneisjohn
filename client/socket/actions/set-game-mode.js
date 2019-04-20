// @flow

import {store} from '../../store';

const setGameMode = (mode: string) => {
  store.dispatch({
    type: 'SET_GAME_MODE',
    payload: {mode}
  });
};

export default setGameMode;
