// @flow

import {playerRepository} from '../repositories';
import events from './events';

import type {SocketType} from '.';

type EventType = {|
  name: string,
  handler: Function,
  isGM?: boolean
|};

export const applyHandlers = (socket: SocketType) => {
  socket.use((packet, next) => {
    const player = playerRepository.find(socket.playerId);

    socket.player = player || null;
    socket.game = player ? player.game : null;

    next();
  });

  for (const event: EventType of events) {
    const {name, handler, isGM} = event;
    const fn = handler.bind(this, socket);
    socket.on(name, (...args) => {
      const {game, player} = socket;
      if (isGM) {
        if (!game || game.owner !== player) {
          return;
        }
      }

      fn(...args);
    });
  }
};
