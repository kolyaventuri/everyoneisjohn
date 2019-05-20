import test from 'ava';

import setup from '../../stubs/create-socket';
import kickPlayer from '../../../../server/socket/actions/kick-player';

test('kicks a given player from a given game', t => {
  const {game, socket} = setup(true, true);
  const {player} = setup(false);

  game.addPlayer(player);

  kickPlayer(socket, player.id);

  t.true(player.leaveGame.called);
});

test('it does nothing if the game does not exist', t => {
  const {socket, player} = setup(false);

  const fn = () => kickPlayer(socket, player.id);

  t.notThrows(fn);
  t.false(player.leaveGame.called);
});
