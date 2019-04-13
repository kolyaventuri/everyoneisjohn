// @flow

import type {SocketType} from '..';

type Payload = {
  amount: number,
  player: string
};

const givePoints = (socket: SocketType, {amount, player: id}: Payload) => {
  const {game} = socket;

  const {players} = game;

  const player = players.find(p => p.id === id);

  player.stats.points += amount;
};

export default givePoints;
