import test from 'ava';
import proxyquire from 'proxyquire';
import {stub, match} from 'sinon';

import {MockSocket} from '../mocks/socket';
import {repositories} from '../mocks';
import Player from '../../../server/models/player';
import Game from '../../../server/models/game';
import createSocket from '../stubs/create-socket';

const stubbedEvent = stub();
const mockEvents = [
  {
    name: 'turtle',
    handler: () => stubbedEvent()
  }
];

const {applyHandlers} = proxyquire('../../../server/socket/handlers', {
  '../repositories': repositories,
  './events': {default: mockEvents}
});

const {playerRepository} = repositories;

test('autobinds events', t => {
  const socket = new MockSocket();
  const {name, handler} = mockEvents[0];

  handler.bind = stub().withArgs(socket).returns(handler);

  applyHandlers(socket);

  t.true(socket.on.calledWith(name, match.func));
});

test('binds middleware to resolve game / player on every event', t => {
  const socket = new MockSocket();

  applyHandlers(socket);

  t.true(socket.use.calledWith(match.func));
});

test('middleware finds game and player for given socket', t => {
  const socket = new MockSocket();

  const player = new Player(socket);
  const game = new Game(new Player(new MockSocket()));
  player.joinGame(game.id);

  playerRepository.find = stub().withArgs(player.id).returns(player);

  applyHandlers(socket);
  socket.__invoke('use', null, socket);

  t.is(socket.player, player);
  t.is(socket.game, game);
});

test('if isGM is true, allows event to execute if player is a GM', t => {
  const {socket} = createSocket(true, true);
  stubbedEvent.reset();
  mockEvents[0].isGM = true;

  applyHandlers(socket);

  socket.__invoke('on', mockEvents[0].name);

  t.true(stubbedEvent.called);
});

test('if isGM is true, AND player is not GM, it does NOT allow the event to execute', t => {
  const {socket} = createSocket(true, false);
  stubbedEvent.reset();
  mockEvents[0].isGM = true;

  applyHandlers(socket);

  socket.__invoke('on', mockEvents[0].name);

  t.false(stubbedEvent.called);
});

test('is isGM is false, anyone can execute event', t => {
  const {socket} = createSocket(false, false);
  stubbedEvent.reset();
  mockEvents[0].isGM = false;

  applyHandlers(socket);

  socket.__invoke('on', mockEvents[0].name);

  t.true(stubbedEvent.called);
});
