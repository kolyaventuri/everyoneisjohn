import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

import Player from '../../../server/models/player';
import {MockSocket, socketToMocks, repositories} from '../mocks';
import * as GameMode from '../../../server/lib/game-mode';

const mockBid = stub();
class Auction {
  bid = mockBid;
}
const globalSocket = new MockSocket();

const Game = proxyquire('../../../server/models/game', {
  '../repositories': repositories,
  './auction': {default: Auction},
  '../socket': {default: globalSocket}
}).default;
const {gameRepository} = repositories;

const socket = new MockSocket();
const genGame = owner => new Game(owner || genPlayer());
const genPlayer = () => new Player(socket);
const genPlayers = num => new Array(num).fill(1).map(_ => genPlayer());

test('it has an ID', t => {
  const game = genGame();

  t.is(typeof game.id, 'string');
  t.true(game.id.length === 5);
});

test('has a slug', t => {
  const game = genGame();

  t.is(typeof game.slug, 'string');
});

test('has an owner', t => {
  const owner = genPlayer();
  const game = genGame(owner);

  t.is(game.owner, owner.id);
});

test('can hold players', t => {
  const game = genGame();

  t.true(Array.isArray(game.players));
});

test('can add players', t => {
  const players = genPlayers(2);
  const game = genGame();

  game.addPlayer(players[0]);
  game.addPlayer(players[1]);

  t.is(game.players.length, 2);

  t.true(game.players.includes(players[0].id));
  t.true(game.players.includes(players[1].id));
});

test('cannot add duplicate players', t => {
  const player = genPlayer();
  const game = genGame();

  game.addPlayer(player);
  game.addPlayer(player);

  t.is(game.players.length, 1);
});

test('can remove players', t => {
  const player = genPlayer();
  const game = genGame();

  game.addPlayer(player);

  game.removePlayer(player);

  t.is(game.players.length, 0);
  t.false(game.players.includes(player));
});

test('gets stored in the game repository during the constructor', t => {
  const game = genGame();

  t.true(gameRepository.insert.calledWith(game));
});

test('ties player to game', t => {
  const game = genGame();
  const player = genPlayer();

  game.addPlayer(player);

  t.is(player.__game, game.id);
});

test('has a game mode', t => {
  const game = genGame();

  t.is(game.mode, GameMode.SETUP);
});

test('can change modes', t => {
  const game = genGame();

  game.mode = GameMode.VOTING;

  t.is(game.mode, GameMode.VOTING);
});

test('cannot set invalid modes', t => {
  const game = genGame();

  game.mode = 123;

  t.is(game.mode, GameMode.SETUP);
});

test('starts an auction during VOTING stage', t => {
  const game = genGame();
  game.mode = GameMode.VOTING;

  t.true(game.__auction instanceof Auction);
});

test('clears out of the action during any other stage', t => {
  const game = genGame();
  game.mode = GameMode.VOTING;
  game.mode = GameMode.SETUP;

  t.is(game.__auction, null);
});

test('#addBid adds a bid for the given player', t => {
  const game = genGame();
  const player = genPlayer();
  game.mode = GameMode.VOTING;

  game.addBid(player, 3);

  t.true(mockBid.calledWith(player, 3));
});

test('#addBid does nothing if not in voting stage', t => {
  const game = genGame();
  const player = genPlayer();

  game.addBid(player, 3);

  t.false(mockBid.calledWith(player, 3));
});

test('can be destroyed', t => {
  const game = genGame();

  game.destroy();

  t.true(gameRepository.destroy.calledWith(game));
});

test('joins a user to the public room upon joining the game', t => {
  const game = genGame();
  const player = new Player(new MockSocket(), 'id');

  const room = `game/${game.id}/all`;

  game.addPlayer(player);

  t.true(player.socket.join.calledWith(room));
});

test('joins a user to the private room upon joining', t => {
  const game = genGame();
  const player = new Player(new MockSocket(), 'id');

  const room = `game/${game.id}/player/${player.id}`;

  game.addPlayer(player);

  t.true(player.socket.join.calledWith(room));
});

test('can emit to all players in the game', t => {
  const game = genGame();

  const event = 'event';
  const payload = 'payload';

  game.emit({
    channel: 'all',
    event,
    payload
  });

  t.true(globalSocket.to.calledWith(`game/${game.id}/all`));
  t.true(socketToMocks.emit.calledWith(event, payload));
});
