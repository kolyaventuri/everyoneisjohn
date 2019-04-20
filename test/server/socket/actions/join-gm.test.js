import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

import {repositories} from '../../mocks';
import setup from '../../stubs/create-socket';

const joinGm = proxyquire('../../../../server/socket/actions/join-gm', {
  '../../repositories': repositories
}).default;
const {gameRepository} = repositories;

test('emits the players to the GM', t => {
  const {socket, game} = setup(true, true);

  gameRepository.find = stub().returns(game);

  joinGm(socket, game.id);

  t.true(game.gmEmitPlayers.called);
});

test('pings back an error if the game exists, but the player is not the GM', t => {
  const {socket, player, game} = setup(true, false, false);
  gameRepository.find = stub().returns(game);

  joinGm(socket, game.id);

  t.is(player.game, null);
  t.true(player.socket.emit.calledWith('game.error', 'error.game.doesnt_exist'));
});

test('pings back an error if the game does not exist', t => {
  const {socket, player} = setup(false);
  gameRepository.find = stub().returns(null);

  joinGm(socket, 'ABCDE');

  t.is(player.game, null);
  t.true(player.socket.emit.calledWith('game.error', 'error.game.doesnt_exist'));
});
