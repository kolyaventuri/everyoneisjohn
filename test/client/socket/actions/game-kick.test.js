import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';

const gameError = stub();

const gameKick = proxyquire('../../../../client/socket/actions/game-kick', {
  './game-error': {default: gameError}
}).default;

test('calls the gameError action', t => {
  gameKick();

  t.true(gameError.calledWith('error.game.kicked'));
});
