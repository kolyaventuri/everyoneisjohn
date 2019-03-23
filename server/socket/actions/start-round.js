// @flow

import type {SocketType} from '..';

const startRound = (socket: SocketType) => {
  const {game} = socket;

  game.emit({
    channel: 'all',
    event: 'startRound'
  });
};

export default startRound;
