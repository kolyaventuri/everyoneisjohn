import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

import Player from '../../../server/models/player';
import {repositories} from '../mocks';
import {MockSocket} from '../mocks/socket';
import {rooms} from '../../../server/constants';
import * as GameMode from '../../../server/lib/game-mode';
import setup from '../stubs/create-socket';

const mockBid = stub();
class Auction {
  bid = mockBid;
}

const Game = proxyquire('../../../server/models/game', {
  '../repositories': repositories,
  './auction': {default: Auction}
}).default;
const {gameRepository, playerRepository} = repositories;

const socket = new MockSocket();
const genGame = owner => new Game(owner || genPlayer());
const genPlayer = () => new Player(socket);
const genPlayers = num => new Array(num).fill(1).map(_ => genPlayer());

test('it has an ID', t => {
  const {game} = setup();

  t.is(typeof game.id, 'string');
  t.true(game.id.length === 5);
});

test('has a slug', t => {
  const {game} = setup();

  t.is(typeof game.slug, 'string');
});

test('has an owner', t => {
  const {game, player: owner} = setup(true, true);

  t.is(game.owner.id, owner.id);
});

test('emits a `startGame` event to the GM upon starting the game', t => {
  const {game} = setup();

  const event = 'startGame';
  const payload = game.id;

  game.gmInitGame();
  t.true(game.emitToGm.calledWith({event, payload}));
});

test('can hold players', t => {
  const {game} = setup();

  t.true(Array.isArray(game.players));
});

test('can add players', t => {
  const players = genPlayers(2);
  const {game} = setup(true, false, false);

  game.addPlayer(players[0]);
  game.addPlayer(players[1]);

  t.is(game.players.length, 2);

  t.is(game.players[0].id, players[0].id);
  t.is(game.players[1].id, players[1].id);
});

test('emits a `gameJoinSuccess` event to the players private room upon joining', t => {
  const player = genPlayer();
  const {game, emit} = setup(true, false, false);

  game.addPlayer(player);

  t.true(emit.calledWith({
    channel: player.rooms.private,
    event: 'gameJoinSuccess',
    payload: game.id
  }));
});

test('cannot add duplicate players', t => {
  const {game, player} = setup();

  game.addPlayer(player);
  game.addPlayer(player);

  t.is(game.players.length, 1);
});

test('can remove players', t => {
  const {game, player} = setup();

  game.addPlayer(player);

  game.removePlayer(player);

  t.is(game.players.length, 0);
  t.false(game.players.includes(player));
});

test('emits a gameKick event to the player when kicked', t => {
  const {game, player, emit} = setup();

  game.addPlayer(player);

  game.removePlayer(player);

  t.true(emit.calledWith({
    channel: player.rooms.private,
    event: 'gameKick'
  }));
});

test('does not emit a gameKick event to the player if silent is true', t => {
  const {game, player, emit} = setup();

  game.addPlayer(player);

  game.removePlayer(player, true);

  t.false(emit.calledWith({
    channel: player.rooms.private,
    event: 'gameKick'
  }));
});

test('gets stored in the game repository during the constructor', t => {
  const {game} = setup();

  t.is(gameRepository.find(game.id), game.id);
});

test('ties player to game', t => {
  const {game, player} = setup();

  game.addPlayer(player);

  t.is(player.__game, game.id);
});

test('has a game mode', t => {
  const {game} = setup();

  t.is(game.mode, GameMode.SETUP);
});

test('can change modes', t => {
  const {game} = setup();

  game.mode = GameMode.VOTING;

  t.is(game.mode, GameMode.VOTING);
});

test('emits mode to players', t => {
  const {game, emit} = setup();

  game.mode = GameMode.VOTING;

  const payload = {
    channel: 'all',
    event: 'setGameMode',
    payload: 'VOTING'
  };

  t.true(emit.calledWith(payload));
});

test('cannot set invalid modes', t => {
  const {game} = setup();

  game.mode = 123;

  t.is(game.mode, GameMode.SETUP);
});

test('starts an auction during VOTING stage', t => {
  const {game} = setup();
  game.mode = GameMode.VOTING;

  t.not(game.__action, null);
});

test('when an auction starts, the winner is cleared', t => {
  const {game, player} = setup();
  playerRepository.find = stub().returns(player);

  player.stats.winner = true;

  game.mode = GameMode.VOTING;

  t.false(player.stats.winner);
});

test('clears out of the action during any other stage', t => {
  const {game} = setup();
  game.mode = GameMode.VOTING;
  game.mode = GameMode.SETUP;

  t.is(game.__auction, null);
});

test('freezes stats when game starts', t => {
  const {game, player} = setup();

  playerRepository.find = stub().returns(player);

  game.mode = GameMode.VOTING;

  t.true(player.stats.__STATICS__.frozen);
});

test('#addBid adds a bid for the given player', t => {
  const game = genGame();
  const player = genPlayer();
  game.addPlayer(player);
  game.mode = GameMode.VOTING;

  game.addBid(player, 3);

  t.true(mockBid.calledWith(player, 3));
});

test('#addBid does nothing if not in voting stage', t => {
  const {game, player} = setup();

  game.addBid(player, 3);

  t.false(mockBid.calledWith(player, 3));
});

test('can be destroyed', t => {
  const game = genGame();

  game.destroy();

  t.true(gameRepository.destroy.calledWith(game));
});

test('joins a user to the public room upon joining the game', t => {
  const {game, player} = setup();

  const room = `game/${game.id}/all`;
  const roomName = rooms.GAME;

  t.is(player.rooms[roomName], room);
});

test('subscribes owner to GM and "all" rooms', t => {
  const {game, player: owner} = setup(true, true);

  const roomName = 'gm';
  const room = `game/${game.id}/gm`;

  const allRoomName = 'game';
  const allRoom = `game/${game.id}/all`;

  t.is(owner.rooms[roomName], room);
  t.is(owner.rooms[allRoomName], allRoom);
});

test('subtracts willpower from auction winner and enters playing mode', t => {
  const owner = new Player(new MockSocket());
  const game = new Game(owner);

  const players = new Array(2).fill(0).map(() => genPlayer());

  for (const p of players) {
    game.addPlayer(p);
  }

  game.endAuction(players[0], 3);

  t.is(players[0].stats.willpower, 7);
  t.is(players[1].stats.willpower, 10);

  t.is(game.mode, GameMode.PLAYING);
});

test('emits players to GM upon adding player to game', t => {
  const {game} = setup(true, true);
  const {player} = setup(false);

  game.addPlayer(player);

  t.true(game.gmEmitPlayers.called);
});

test('#gmEmitPlayers emits players to GM', t => {
  const {game, player: owner} = setup(true, true);
  const {player} = setup(false);

  const payload = [player.serialize()];

  const expected = {
    event: 'setPlayers',
    payload
  };

  game.addPlayer(player);

  t.true(owner.emitToMe.calledWith(expected));
});

test('#emitToGm emits to the GMs private channel', t => {
  const {game, player: owner} = setup(true, true);

  const event = 'blah';
  const payload = 'payload';
  game.emitToGm({event, payload});

  t.true(owner.emitToMe.calledWith({
    event,
    payload
  }));
});

test('#emitToAll emits to the GAME room', t => {
  const {game, emit, player: owner} = setup(true, true);

  const event = 'blah';
  const payload = 'payload';
  game.emitToAll({event, payload});

  t.true(emit.calledWith({
    channel: owner.rooms.game,
    event,
    payload
  }));
});
