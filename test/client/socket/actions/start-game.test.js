import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';

const push = stub().returnsArg(0);
const dispatch = stub();
const store = {dispatch};

proxyquire.noCallThru();
const startGame = proxyquire('../../../../client/socket/actions/start-game', {
  'connected-react-router': {push},
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

test('redirects player to GM route', t => {
  const gameId = 'ABCDE';
  startGame(gameId);

  t.true(dispatch.calledWith(push(`/game/${gameId}/gm`)));
});
