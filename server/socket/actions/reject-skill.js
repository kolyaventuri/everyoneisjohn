// @flow

import type {SocketType} from '..';

type Payload = {
  player: string,
  index: number
};

const rejectSkill = (socket: SocketType, {player: id, index}: Payload) => {
  const {game} = socket;
  const {players} = game;
  const player = players.find(p => p.id === id);

  if (player) {
    player.stats.deleteSkill(index + 1);
  }
};

export default rejectSkill;
