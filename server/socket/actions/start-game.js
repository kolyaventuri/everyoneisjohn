// @flow

import startBidding from './start-bidding';
import type {SocketType} from '..';

const startGame = (socket: SocketType) => {
  const {game} = socket;

  for (const p of game.players) {
    p.stats.freeze();
  }

  startBidding(socket);
};

export default startGame;
