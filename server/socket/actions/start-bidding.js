// @flow

import * as GameModes from '../../lib/game-mode';
import type {SocketType} from '..';

const startBidding = (socket: SocketType) => {
  const {game, player} = socket;

  if (game.owner === player) {
    game.mode = GameModes.VOTING;

    game.emit({
      channel: 'all',
      event: 'startBidding'
    });
  }
};

export default startBidding;
