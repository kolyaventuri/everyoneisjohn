import test from 'ava';
import uuid from 'uuid/v4';

import setup from '../../stubs/create-socket';
import updatePlayer from '../../../../server/socket/actions/update-player';

test('changes the players name if provided', t => {
  const {player, socket} = setup();
  const name = uuid();

  updatePlayer(socket, {name});

  t.is(player.name, name);
});
