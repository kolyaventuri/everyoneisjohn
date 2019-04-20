// @flow

import type {SocketType} from '..';
import {gameRepository} from '../../repositories';

const joinGm = (socket: SocketType, gameId: string) => {
  const {player} = socket;
  const game = gameRepository.find(gameId);

  if (game && game.owner === player) {
    return game.gmEmitPlayers();
  }

  socket.emit('game.error', 'error.game.doesnt_exist');
};

export default joinGm;
