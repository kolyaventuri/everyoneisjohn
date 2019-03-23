import test from 'ava';
import proxyquire from 'proxyquire';
import sinon, {stub} from 'sinon';
import uuid from 'uuid/v4';

import {repositories} from '../mocks';
import {MockSocket} from '../mocks/socket';
import Stats from '../../../server/models/stats';
import Game from '../../../server/models/game';

const Player = proxyquire('../../../server/models/player', {
  '../repositories': repositories
}).default;
const {gameRepository, playerRepository} = repositories;

const socket = new MockSocket();
const genPlayer = () => new Player(socket);
const genGame = () => new Game(genPlayer());

test('it has an ID', t => {
  const player = genPlayer();

  t.is(typeof player.id, 'string');
  t.true(player.id.length > 0);
});

test('it appends the ID to the socket', t => {
  const player = new Player(new MockSocket());

  t.is(player.socket.playerId, player.id);
});

test('it has a default name', t => {
  const player = genPlayer();

  t.is(typeof player.name, 'string');
  t.true(player.name.length > 0);
});

test('name can change', t => {
  const player = genPlayer();
  const newName = 'JohnDoe';

  t.not(player.name, newName);

  player.name = newName;

  t.is(player.name, newName);
});

test('if player is in a game, the name change is sent to the GM', t => {
  const player = genPlayer();
  const ownerSocket = new MockSocket();
  const owner = new Player(ownerSocket);
  const game = new Game(owner);

  game.addPlayer(player);
  gameRepository.find = stub().returns(game);
  stub(game, 'owner').get(() => owner);

  const name = uuid();

  player.name = name;

  t.true(ownerSocket.emit.calledWith('playerUpdated', {
    id: player.id,
    name
  }));
});

test('has an active flag', t => {
  const player = genPlayer();

  t.true(player.active);
});

test('can be deactivated', t => {
  const player = genPlayer();
  player.deactivate();

  t.false(player.active);
});

test('can be instantiated with a given ID', t => {
  const id = 'some-random-id';
  const player = new Player(socket, id);

  t.is(player.id, id);
});

test('has a socket', t => {
  const player = genPlayer();

  t.is(player.socket, socket);
});

test('gets stored in the repository', t => {
  const player = genPlayer();

  t.true(playerRepository.insert.calledWith(player));
});

test('can hold a game objet', t => {
  const player = genPlayer();
  const game = {id: 'ABCDE'};

  player.setGame(game);
  gameRepository.find = stub().returns(game.id);

  t.is(player.game, game.id);
});

test('has stats', t => {
  const player = genPlayer();

  t.true(player.stats instanceof Stats);
});

test('can be destroyed', t => {
  const player = genPlayer();

  player.destroy();

  t.true(playerRepository.destroy.calledWith(player));
});

test('can join a game', t => {
  const game = genGame();
  const player = genPlayer();

  gameRepository.find = stub().returns(game);
  player.joinGame(game.id);

  t.is(player.game, game);
});

test('can leave a game', t => {
  const game = genGame();
  const player = genPlayer();
  gameRepository.find = stub().onCall(0).returns(game).returns(null);
  player.joinGame(game.id);

  player.leaveGame();

  t.is(player.game, null);
});

test('is subscribed to the public game room upon joining the game', t => {
  const owner = new Player(socket, 'id');
  const player = new Player(new MockSocket(), 'id');
  const game = new Game(owner);

  gameRepository.find = stub().returns(game);

  const room = `game/${game.id}/all`;

  player.joinGame(game.id);

  t.true(player.socket.join.calledWith(room));
});

test('is subscribed to the private channel upon joining the game', t => {
  const game = genGame();
  const player = new Player(new MockSocket(), 'id');

  gameRepository.find = stub().returns(game);

  const room = `game/${game.id}/player/${player.id}`;

  game.addPlayer(player);

  t.true(player.socket.join.calledWith(room));
});

test('has a disconnect timeout set if they leave', t => {
  const game = genGame();
  const player = new Player(new MockSocket(), 'id');

  player.leaveGame = stub();
  player.destroy = stub();
  gameRepository.find = stub().returns(game);

  game.addPlayer(player);

  const clock = sinon.useFakeTimers();

  player.disconnect();

  t.false(player.active);
  clock.tick(60 * 1000);

  t.true(player.leaveGame.called);
  t.true(player.destroy.called);

  clock.restore();
});

test('has the discount timeout cleared if they return within the time allowed', t => {
  const game = genGame();
  const player = new Player(new MockSocket(), 'id');

  player.leaveGame = stub();
  gameRepository.find = stub().returns(game);

  game.addPlayer(player);
  const clock = sinon.useFakeTimers();
  player.disconnect();
  clock.tick(30 * 1000);

  player.reconnect();
  t.true(player.active);

  clock.tick(40 * 1000);
  t.true(player.active);

  t.false(player.leaveGame.called);

  clock.restore();
});

test('handleUpdateStats emits to both player and GM', t => {
  const owner = genPlayer();
  const game = genGame(owner);
  const player = genPlayer();
  const stats = {willpower: 10};

  stub(game, 'owner').get(() => owner);
  stub(player, 'game').get(() => game);

  game.addPlayer(player);
  player.handleUpdateStats(stats);

  t.true(player.socket.emit.calledWith('updateStats', stats));
  t.true(game.owner.socket.emit.calledWith('updateStats', {player: player.id, ...stats}));
});
