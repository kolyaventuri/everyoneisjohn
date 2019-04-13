// @flow

import type {SocketType} from '..';

type Payload = {
  amount: number,
  player?: string
};

const giveWillpower = (socket: SocketType, {amount, player}: Payload) => {
  const {game} = socket;
  const {players} = game;

  if (player) {
    const playerInstance = players.find(p => p.id === player);
    playerInstance.stats.willpower += amount;
  } else {
    for (const p of players) {
      p.stats.willpower += amount;
    }
  }
};

export default giveWillpower;
