import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';

const dispatch = stub();
const store = {dispatch};

const errors = {
  someError: 'error',
  game: {
    someError: 'error'
  }
};
const type = 'error';

proxyquire.noCallThru();
const gameError = proxyquire('../../../../client/socket/actions/game-error', {
  '../../store': {store},
  '../../constants/error-map': errors
}).default;

test('updates the redux store with the error', t => {
  const errorFull = 'error.someError';
  const error = 'someError';
  gameError(errorFull);

  t.true(dispatch.calledWith({
    type: 'SET_ERROR',
    payload: {error, type}
  }));
});

test('can handle nested errors', t => {
  const errorFull = 'error.game.someError';
  const error = 'game.someError';
  gameError(errorFull);

  t.true(dispatch.calledWith({
    type: 'SET_ERROR',
    payload: {error, type}
  }));
});

test('does not dispatch the error if it is not defined', t => {
  const errorFull = 'error.invalidError';
  const error = 'invalidError';
  gameError(errorFull);

  t.false(dispatch.calledWith({
    type: 'SET_ERROR',
    payload: {error, type}
  }));
});
