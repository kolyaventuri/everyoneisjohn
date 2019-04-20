import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';

const dispatch = stub();
const store = {dispatch};

proxyquire.noCallThru();
const setGameMode = proxyquire('../../../../client/socket/actions/set-game-mode', {
  '../../store': {store}
}).default;

test('updates the redux store with the game mode', t => {
  const mode = 'VOTING';
  setGameMode(mode);

  t.true(dispatch.calledWith({
    type: 'SET_GAME_MODE',
    payload: {mode}
  }));
});
