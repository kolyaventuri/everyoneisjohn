// @flow

import {playerRepository} from '../repositories';
import events from './events';

type SocketType = {[string]: any};

export const applyHandlers = (socket: SocketType) => {
  socket.use((socket, next) => {
    const player = playerRepository.find(socket.playerId);

    socket.player = player || null;
    socket.game = player ? player.game : null;

    next();
  });

  for (const {name, handler} of events) {
    socket.on(name, handler);
  }
};
