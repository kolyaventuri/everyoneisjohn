// @flow

import type {SocketType} from '..';

const disconnect = (socket: SocketType) => {
  const {player, game} = socket;

  if (game) {
    player.disconnect();
  } else {
    player.destroy();
  }
};

export default disconnect;
