import test from 'ava';
import proxyquire from 'proxyquire';
import sinon, {stub} from 'sinon';
import uuid from 'uuid/v4';

import {repositories} from '../mocks';
import {MockSocket} from '../mocks/socket';
import setup from '../stubs/create-socket';
import Stats from '../../../server/models/stats';
import Game from '../../../server/models/game';

const Player = proxyquire('../../../server/models/player', {
  '../repositories': repositories
}).default;
const {gameRepository, playerRepository} = repositories;

const socket = new MockSocket();
const genPlayer = () => new Player(socket);

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
  const game = new Game(owner, false);
  stub(player, 'game').get(() => game);
  stub(game, 'owner').get(() => owner);
  game.gmInitGame();

  gameRepository.find = stub().returns(game);
  game.addPlayer(player);

  player.emitUpdate = stub();

  const name = uuid();

  player.name = name;

  t.true(player.emitUpdate.called);
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
  const {game, player} = setup();

  gameRepository.find = stub().returns(game);
  player.joinGame(game.id);

  t.is(player.game, game);
});

test('can leave a game', t => {
  const {game, player} = setup();
  gameRepository.find = stub().onCall(0).returns(game).returns(null);
  player.joinGame(game.id);

  player.leaveGame();

  t.is(player.game, null);
});

test('can leave a game silently', t => {
  const {game, player} = setup();
  gameRepository.find = stub().onCall(0).returns(game).returns(null);
  player.joinGame(game.id);

  player.leaveGame({silent: true});

  t.is(player.game, null);
  t.true(game.removePlayer.calledWith(player, true));
});

test('is subscribed to the public game room upon joining the game', t => {
  const {game, player} = setup(true, false);

  gameRepository.find = stub().returns(game);

  const room = `game/${game.id}/all`;

  player.joinGame(game.id);

  t.true(player.socket.join.calledWith(room));
});

test('is subscribed to the private channel upon joining the game', t => {
  const {game, player} = setup();

  gameRepository.find = stub().returns(game);

  const room = `game/${game.id}/player/${player.id}`;

  game.addPlayer(player);

  t.true(player.socket.join.calledWith(room));
});

test('has a disconnect timeout set if they leave', t => {
  const {game, player} = setup();

  player.leaveGame = stub();
  player.destroy = stub();
  player.destroyGame = stub();
  gameRepository.find = stub().returns(game);

  game.addPlayer(player);

  const clock = sinon.useFakeTimers();

  player.disconnect();

  t.false(player.active);
  clock.tick(60 * 1000);

  t.true(player.leaveGame.called);
  t.true(player.destroy.called);
  t.true(player.destroyGame.called);

  clock.restore();
});

test('has the discount timeout cleared if they return within the time allowed', t => {
  const {game, player} = setup();

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

test('#destroyGame destroys the game they own, if one exists', t => {
  const {game, player} = setup(true, true);

  player.destroyGame();

  t.true(game.destroy.called);
});

test('#destroyGame does not destroy the game if they are not the owner', t => {
  const {game, player} = setup(true);

  player.destroyGame();

  t.false(game.destroy.called);
});

test('#destroyGame does not error if they do not own a game', t => {
  const {player} = setup(false);

  const fn = player.destroyGame;

  t.notThrows(fn);
});

test('emitUpdate is called when a player joins a game', t => {
  const {game, player} = setup();
  const {owner} = game;

  stub(game, 'owner').get(() => owner);
  stub(player, 'game').get(() => game);
  player.emitUpdate = stub();

  game.addPlayer(player);

  t.true(player.emitUpdate.called);
});

test('stats are destroyed upon joining new game', t => {
  const {game, player} = setup();

  game.addPlayer(player);
  player.stats.willpower += 5;

  const oldStats = Object.assign({}, player.serialize());

  const {game: gameB} = setup();

  gameB.addPlayer(player);

  const newStats = Object.assign({}, player.serialize());

  t.notDeepEqual(newStats, oldStats);
});

test('player is booted from the old game if they join a new one', t => {
  const {game, player} = setup();

  player.joinGame(game.id);

  const {game: gameB} = setup();

  player.joinGame(gameB.id);

  t.true(player.leaveGame.called);
});

test('emitSkill emits a setSkill event to the player', t => {
  const {player} = setup();

  const skill = 'skill';
  player.stats.__STATICS__.skill1 = skill;

  player.emitSkill(0);

  t.true(player.socket.emit.calledWith('setSkill', {index: 0, skill}));
});

test('emitUpdate does not emit anything if there has been no change since the last update', t => {
  const {player} = setup();

  player.emitUpdate();

  t.true(player.socket.emit.calledWith('updatePlayer'));
  const calls = player.socket.emit.args;
  const updateCalls = calls.filter(call => call[0] === 'updatePlayer');

  t.is(updateCalls.length, 1); // Account for the one call when player is created
});

test('emitUpdate emits only the changed values', t => {
  const {player} = setup();
  const willpower = 7;
  const {id} = player;

  player.stats.willpower = willpower;

  t.true(player.socket.emit.calledWithExactly('updatePlayer', {id, willpower}));
});
