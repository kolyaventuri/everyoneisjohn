// @flow

import {playerRepository} from '../../repositories';

import type {SocketType} from '..';

const disconnect = (socket: SocketType) => {
  const player = playerRepository.find(socket.playerId);
  const {game} = player;

  if (game) {
    player.disconnect();
  } else if (player) {
    player.destroy();
  }
};

export default disconnect;
