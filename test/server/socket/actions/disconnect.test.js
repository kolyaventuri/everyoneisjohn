import test from 'ava';
import sinon from 'sinon';

import setup from '../../stubs/create-socket';
import disconnect from '../../../../server/socket/actions/disconnect';

test('calls player.disconnect() if a game exists', t => {
  const {player, socket} = setup();
  const clock = sinon.useFakeTimers();

  disconnect(socket);

  t.true(player.disconnect.called);

  clock.restore();
});

test('calls player.destroy() if no game exists', t => {
  const {player, socket} = setup(false);
  const clock = sinon.useFakeTimers();

  disconnect(socket);

  t.true(player.destroy.called);

  clock.restore();
});
