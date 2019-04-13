// @flow

import type {SocketType} from '..';

const joinGame = (socket: SocketType, gameId: string) => {
  const {player} = socket;

  player.joinGame(gameId);
};

export default joinGame;
