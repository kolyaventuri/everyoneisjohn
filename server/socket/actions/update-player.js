// @flow

import type {SocketType} from '..';

type Payload = {
  name?: string
};

const updatePlayer = (socket: SocketType, payload: Payload) => {
  const {name} = payload;
  const {player} = socket;

  if (name) {
    player.name = name;
  }
};

export default updatePlayer;
