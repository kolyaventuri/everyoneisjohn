// @flow

import type {SocketType} from '..';
import {playerRepository} from '../../repositories';

const kickPlayer = (socket: SocketType, playerId: string) => {
  const {game} = socket;
  const player = playerRepository.find(playerId);

  if (game) {
    player.leaveGame();
  }
};

export default kickPlayer;
