// @flow

import * as GameModes from '../../lib/game-mode';
import type {SocketType} from '..';

const startPlaying = (socket: SocketType) => {
  const {game, player} = socket;

  if (game.owner === player) {
    game.mode = GameModes.PLAYING;
    game.emit({
      channel: 'all',
      event: 'startPlaying'
    });
  }
};

export default startPlaying;
