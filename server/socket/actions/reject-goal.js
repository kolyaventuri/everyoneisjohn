// @flow

import type {SocketType} from '..';

type Payload = {
  player: string
};

const rejectGoal = (socket: SocketType, {player: id}: Payload) => {
  const {game} = socket;
  const {players} = game;
  const player = players.find(p => p.id === id);

  if (player) {
    player.stats.deleteGoal();
  }
};

export default rejectGoal;
