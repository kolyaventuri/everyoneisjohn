import test from 'ava';

import setup from '../../stubs/create-socket';
import startRound from '../../../../server/socket/actions/start-round';

test('emits a startRound event if the player is the owner', t => {
  const {socket, game} = setup();

  startRound(socket);

  t.true(game.emit.calledWith({
    channel: 'all',
    event: 'startRound'
  }));
});
