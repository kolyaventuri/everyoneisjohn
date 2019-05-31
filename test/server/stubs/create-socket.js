import {stub} from 'sinon';

import {MockSocket} from '../mocks/socket';
import Player from '../../../server/models/player';
import Game from '../../../server/models/game';

const methods = [
  'deactivate',
  'joinGame',
  'leaveGame',
  'setGame',
  'disconnect',
  'reconnect',
  'destroy',
  'emitUpdate',
  'assignRoom'
];

const gameMethods = [
  'addPlayer',
  'removePlayer',
  'addBid',
  'destroy',
  'emit',
  'gmEmitPlayers'
];

const stubAndCallThrough = (obj, func) => {
  const original = obj[func].bind(obj);
  return stub(obj, func).callsFake((...args) => {
    original(...args);
  });
};

const setup = (createGame = true, playerIsOwner = false, joinToGame = true) => {
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

  return {player, socket, game};
};

export default setup;
