import test from 'ava';
import proxyquire from 'proxyquire';
import {stub, match} from 'sinon';

import {MockSocket} from '../../mocks/socket';
import {repositories} from '../../mocks';
import Player from '../../../../server/models/player';

const eventsArray = proxyquire('../../../../server/socket/events', {
  'socket.io': () => {
    return new MockSocket();
  },
  '../repositories': repositories
}).default;
const {playerRepository} = repositories;

// Remap events to object for ease of use
const events = {};
for (const event of eventsArray) {
  events[event.name] = event.handler;
}

test('creates a new player if none exists', t => {
  const socket = new MockSocket();

  events.initPlayer(socket);

  t.not(socket.playerId, null);
  t.true(socket.emit.calledWith('setPlayerInfo', {
    id: match.string,
    name: match.string
  }));
});

test('retrieves an existing player if the player is reconnecting', t => {
  const originalSocket = new MockSocket();
  const player = new Player(originalSocket);
  player.reconnect = stub();
  playerRepository.find = stub().withArgs(player.id).returns(player);

  const socket = new MockSocket();

  events.initPlayer(socket, player.id);

  const data = {
    id: player.id,
    name: player.name
  };
  t.is(socket.playerId, player.id);
  t.true(socket.emit.calledWith('setPlayerInfo', data));
  t.true(player.reconnect.called);
});
