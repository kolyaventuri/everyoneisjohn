import test from 'ava';

import setup from '../../stubs/create-socket';
import joinGame from '../../../../server/socket/actions/join-game';

test('joins a player to an existing game', t => {
  const {game} = setup(true, true);
  const {socket, player} = setup(false);

  joinGame(socket, game.id);

  t.is(player.game.id, game.id);
  t.true(game.players.includes(player));
});

test('pings back an error if the game does not exist', t => {
  const {socket, player} = setup(false);

  joinGame(socket, 'ABCDE');

  t.is(player.game, null);
  t.true(player.socket.emit.calledWith('gameError', 'error.game.doesnt_exist'));
});
