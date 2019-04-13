// @flow

import startBidding from './start-bidding';
import type {SocketType} from '..';

const startGame = (socket: SocketType) => {
  const {game, player} = socket;

  if (game.owner === player) {
    for (const p of game.players) {
      p.stats.freeze();
    }
  }

  startBidding(socket);
};

export default startGame;
