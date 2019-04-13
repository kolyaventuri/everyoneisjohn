// @flow

import type {SocketType} from '..';

const disconnect = (socket: SocketType) => {
  const {player, game} = socket;

  if (game) {
    player.disconnect();
  } else if (player) {
    player.destroy();
  }
};

export default disconnect;
