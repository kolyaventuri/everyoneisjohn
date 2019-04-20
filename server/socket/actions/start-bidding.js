// @flow

import * as GameModes from '../../lib/game-mode';
import type {SocketType} from '..';

const startBidding = (socket: SocketType) => {
  const {game} = socket;

  game.mode = GameModes.VOTING;
};

export default startBidding;
