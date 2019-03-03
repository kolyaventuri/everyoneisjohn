import test from 'ava';
import proxyquire from 'proxyquire';
import {stub, match} from 'sinon';

import {MockSocket} from '../mocks/socket';
import {repositories} from '../mocks';
import Player from '../../../server/models/player';
import Game from '../../../server/models/game';

const mockEvents = [
  {
    name: 'turtle',
    handler: () => {}
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

  applyHandlers(socket);

  t.true(socket.on.calledWith(name, handler));
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
