import {stub} from 'sinon';

import {MockSocket} from '../mocks/socket';
import Player from '../../../server/models/player';
import Game from '../../../server/models/game';

const setup = (createGame = true) => {
  const game = new Game(new Player(new MockSocket()));
  const socket = new MockSocket();
  const player = new Player(socket);
  player.disconnect = stub();
  player.destroy = stub();
  game.addPlayer(player);

  socket.player = player;
  if (createGame) {
    socket.game = game;
  }

  return {player, socket};
};

export default setup;
