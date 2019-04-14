// @flow

import Player from '../../models/player';
import {playerRepository} from '../../repositories';
import type {SocketType} from '..';

const initPlayer = (socket: SocketType, id?: string) => {
  let player;
  if (id) {
    player = playerRepository.find(id);
  }

  if (player) {
    player.reconnect();
    socket.playerId = player.id;
    player.__STATICS__.socket = socket;
  } else {
    player = new Player(socket);
  }

  player.emitUpdate(false);
};

export default initPlayer;
