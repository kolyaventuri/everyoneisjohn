// @flow

import type {SocketType} from '..';
import {gameRepository} from '../../repositories';

const joinGm = (socket: SocketType, gameId: string) => {
  const {player} = socket;
  const game = gameRepository.find(gameId);

  if (game && game.owner === player) {
    game.gmInitGame();
    game.gmEmitPlayers();
    return;
  }

  socket.emit('game.error', 'error.game.doesnt_exist');
};

export default joinGm;
