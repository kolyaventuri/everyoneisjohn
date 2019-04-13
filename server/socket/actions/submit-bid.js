// @flow

import type {SocketType} from '..';

type Payload = {
  amount: number
};

const submitBid = (socket: SocketType, {amount}: Payload) => {
  const {game, player} = socket;

  if (game) {
    game.addBid(player, amount);
  }
};

export default submitBid;
