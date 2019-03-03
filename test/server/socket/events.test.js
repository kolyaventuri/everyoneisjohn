import test from 'ava';
import proxyquire from 'proxyquire';
import {stub, match} from 'sinon';

import {MockSocket} from '../mocks/socket';
import {repositories} from '../mocks';
import Player from '../../../server/models/player';

const eventsArray = proxyquire('../../../server/socket/events', {
  '../repositories': repositories
}).default;
const {playerRepository} = repositories;

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

test('"initPlayer" retrieves an existing player if the player is reconnecting', t => {
  const originalSocket = new MockSocket();
  const player = new Player(originalSocket);
  playerRepository.find = stub().withArgs(player.id).returns(player);

  const socket = new MockSocket();

  events.initPlayer(socket);

  t.is(socket.playerId, player.id);
  t.true(socket.emit.calledWith('setPlayerId', player.id));
});
