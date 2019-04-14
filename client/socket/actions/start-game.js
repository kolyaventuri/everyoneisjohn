// @flow

import {push} from 'connected-react-router';

import {store} from '../../store';

const startGame = (gameId: string) => {
  store.dispatch({
    type: 'SET_GAME_GM',
    payload: {gameId}
  });

  store.dispatch(push(`/game/${gameId}/gm`));
};

export default startGame;
