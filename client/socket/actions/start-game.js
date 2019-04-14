// @flow

import {store} from '../../store';

const startGame = (gameId: string) => {
  store.dispatch({
    type: 'SET_GAME_GM',
    payload: {gameId}
  });
};

export default startGame;
