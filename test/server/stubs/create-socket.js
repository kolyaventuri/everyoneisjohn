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
  'destroy'
];

const gameMethods = [
  'addPlayer',
  'removePlayer',
  'addBid',
  'destroy',
  'emit'
];

const setup = (createGame = true) => {
  const game = new Game(new Player(new MockSocket()));
  const socket = new MockSocket();
  const player = new Player(socket);

  for (const m of methods) {
    player[m] = stub();
  }

  game.addPlayer(player);

  socket.player = player;

  if (createGame) {
    for (const m of gameMethods) {
      game[m] = stub();
    }

    socket.game = game;
  }

  return {player, socket, game};
};

export default setup;
