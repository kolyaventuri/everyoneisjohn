// @flow

import Player from '../../models/player';
import {playerRepository} from '../../repositories';
import type {SocketType} from '..';

const initPlayer = (socket: SocketType, id?: string) => {
  let player;
  if (id) {
    player = playerRepository.find(id);
    player.reconnect();
  }

  if (player) {
    socket.playerId = player.id;
    player.__STATICS__.socket = socket;
  } else {
    player = new Player(socket);
  }

  socket.emit('setPlayerId', player.id);
};

export default initPlayer;
