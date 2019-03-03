// @flow

import Player from '../models/player';
import {playerRepository} from '../repositories';

type SocketType = {[string]: any};

const events = [
  {
    name: 'initPlayer',
    handler: (socket: SocketType, id?: string) => {
      let player;
      if (id) {
        player = playerRepository.find(id);
      }

      if (player) {
        socket.playerId = player.id;
        player.__STATICS__.socket = socket;
      } else {
        player = new Player(socket);
      }

      socket.emit('setPlayerId', player.id);
    }
  }
];

export default events;
