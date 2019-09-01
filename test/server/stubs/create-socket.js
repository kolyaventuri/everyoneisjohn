import proxyquire from 'proxyquire';
import sinon, {stub} from 'sinon';

import {MockSocket} from '../mocks/socket';

const methods = [
  'deactivate',
  'joinGame',
  'leaveGame',
  'setGame',
  'disconnect',
  'reconnect',
  'destroy',
  'emitUpdate',
  'assignRoom',
  'emitToMe',
  'clearRooms',
  'rejoinRooms',
  'waitForRooms',
  'hardEmit',
  'emitTimeout',
  'emitGameJoinSuccess'
];

const gameMethods = [
  'addPlayer',
  'removePlayer',
  'addBid',
  'destroy',
  'gmEmitPlayers',
  'emitToGm',
  'gmInitGame',
  'emitToAll'
];

const mockPromise = {
  then: cb => {
    cb();
    return {catch: () => {}};
  }
};

const stubAndCallThrough = (obj, func) => {
  const original = obj[func].bind(obj);
  return stub(obj, func).callsFake((...args) => {
    original(...args);
  });
};

const setup = (createGame = true, playerIsOwner = false, joinToGame = true) => {
  const emit = stub();
  const Player = proxyquire('../../../server/models/player', {
    '../socket/emitter': {emit}
  }).default;
  const Game = proxyquire('../../../server/models/game', {
    '../socket/emitter': {emit}
  }).default;
  const owner = new Player(new MockSocket());
  const socket = new MockSocket();
  const player = new Player(socket);
  let game;

  if (playerIsOwner) {
    game = new Game(player);
  } else if (createGame) {
    game = new Game(owner);
    if (joinToGame) {
      game.addPlayer(player);
    }
  }

  for (const m of methods) {
    stubAndCallThrough(player, m);
  }

  socket.player = player;

  if (createGame) {
    for (const m of gameMethods) {
      stubAndCallThrough(game, m);
    }

    socket.game = game;
  }

  sinon.stub(player, 'waitForSocketConnection').returns(mockPromise);

  return {player, socket, game, emit};
};

export default setup;
