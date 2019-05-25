// @flow

import {replace} from 'connected-react-router';

import {store} from '../../store';

const startGame = (gameId: string) => {
  store.dispatch({
    type: 'SET_GAME_GM',
    payload: {gameId}
  });

  store.dispatch(replace(`/game/${gameId}/gm`));
};

export default startGame;
