import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';

const replace = stub().returnsArg(0);
const dispatch = stub();
const store = {dispatch};

proxyquire.noCallThru();
const startGame = proxyquire('../../../../client/socket/actions/start-game', {
  'connected-react-router': {replace},
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

test('redirects player to GM route via replace', t => {
  const gameId = 'ABCDE';
  startGame(gameId);

  t.true(dispatch.calledWith(replace(`/game/${gameId}/gm`)));
});
