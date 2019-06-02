// @flow

import type {SocketType} from '..';
import {gameRepository} from '../../repositories';
import {logInfo, logError} from '../../lib/logger';

const joinGm = (socket: SocketType, gameId: string) => {
  const {player} = socket;
  const game = gameRepository.find(gameId);

  if (player) {
    logInfo(`Player ${player.id} attempting to GM game ${gameId}`);
  } else {
    logError(`Unknown player attempting to GM game ${gameId}`);
  }

  if (game) {
    if (game.owner === player) {
      game.gmInitGame();
      game.gmEmitPlayers();
      return;
    }

    logError(`Owner mismatch for game ${gameId}.\nOwner: ${game.owner.id}\nPlayer: ${player.id}`);
  } else {
    logError(`Game ${gameId} not found`);
  }

  player.emitToMe({
    event: 'gameError',
    payload: 'error.game.doesntExist'
  });
};

export default joinGm;
