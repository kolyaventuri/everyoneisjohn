import test from 'ava';
import {match} from 'sinon';

import setup from '../../stubs/create-socket';
import createGame from '../../../../server/socket/actions/create-game';

test('creates a game', t => {
  const {player, socket} = setup(false);

  createGame(socket);

  t.true(player.socket.join.calledWith(match.string));
  t.true(player.emitToMe.calledWith({
    event: 'startGame',
    payload: match.string
  }));
});
