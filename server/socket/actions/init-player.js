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

  socket.emit('setPlayerInfo', {
    id: player.id,
    name: player.name
  });
};

export default initPlayer;
