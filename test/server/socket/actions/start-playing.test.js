import test from 'ava';

import setup from '../../stubs/create-socket';
import startPlaying from '../../../../server/socket/actions/start-playing';
import * as GameModes from '../../../../server/lib/game-mode';

test('emits a startPlaying event if the player is the owner', t => {
  const {socket, game} = setup(true, true);

  startPlaying(socket);

  t.true(game.emit.calledWith({
    channel: 'all',
    event: 'startPlaying'
  }));
});

test('puts the game in PLAYING mode', t => {
  const {socket, game} = setup(true, true);
  startPlaying(socket);

  t.is(game.mode, GameModes.PLAYING);
});
