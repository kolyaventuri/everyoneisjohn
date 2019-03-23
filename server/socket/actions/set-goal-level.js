// @flow

import type {SocketType} from '..';

type Payload = {
  amount: number,
  player: string
};

const givePoints = (socket: SocketType, {amount, player: id}: Payload) => {
  const {game, player: invoker} = socket;

  if (game.owner === invoker) {
    const {players} = game;

    const player = players.find(p => p.id === id);

    player.stats.goalLevel = amount;
  }
};

export default givePoints;
