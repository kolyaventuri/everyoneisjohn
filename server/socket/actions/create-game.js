// @flow

import type {SocketType} from '..';
import Game from '../../models/game';

const createGame = (socket: SocketType) => {
  const {player} = socket;

  const game = new Game(player, false);

  game.gmInitGame();
};

export default createGame;
