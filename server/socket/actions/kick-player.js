// @flow

import type {SocketType} from '..';
import {playerRepository} from '../../repositories';

type Payload = {|
  player: string
|};

const kickPlayer = (socket: SocketType, {player: playerId}: Payload) => {
  const {game} = socket;
  const player = playerRepository.find(playerId);

  if (game) {
    player.leaveGame();
  }
};

export default kickPlayer;
