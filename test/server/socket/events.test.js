import test from 'ava';
import {match} from 'sinon';

import eventsArray from '../../../server/socket/events';
import {MockSocket} from '../mocks/socket';

// Remap events to object for ease of use
const events = {};
for (const event of eventsArray) {
  events[event.name] = event.handler;
}

test('"initPlayer" creates a new player if none exists', t => {
  const socket = new MockSocket();

  events.initPlayer(socket);

  t.not(socket.playerId, null);
  t.true(socket.emit.calledWith('setPlayerId', match.string));
});
