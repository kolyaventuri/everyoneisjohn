import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';

const dispatch = stub();
const store = {dispatch};

proxyquire.noCallThru();
const startGame = proxyquire('../../../../client/socket/actions/start-game', {
  '../../store': {store}
}).default;

test('updates the redux store with the game', t => {
  const gameId = 'ABCDE';
  startGame(gameId);

  t.true(dispatch.calledWith({
    type: 'SET_GAME_GM',
    payload: {gameId}
  }));
});
