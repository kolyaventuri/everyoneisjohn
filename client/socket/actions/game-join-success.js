// @flow

import {store} from '../../store';

const gameJoinSuccess = (gameId: string) => {
  store.dispatch({
    type: 'SET_GAME_ID',
    payload: {gameId}
  });
};

export default gameJoinSuccess;
