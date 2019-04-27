import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

import {EIJ_PID} from '../../../../client/constants/storage-keys';

const set = stub();
const state = {
  game: {
    isGm: false
  }
};

const store = {
  getState: stub().returns(state),
  dispatch: stub()
};

const setPlayerInfo = proxyquire('../../../../client/socket/actions/update-player', {
  '../../utils/local-storage': {set},
  '../../store': {store}
}).default;

test('it dispatches a SET_PLAYER_INFO action if the player is not the GM', t => {
  const payload = {data: 1};
  setPlayerInfo(payload);

  t.true(store.dispatch.calledWith({
    type: 'SET_PLAYER_INFO',
    payload
  }));
});

test('it dispatches a SET_GAME_PLAYER_INFO action if the player is the GM', t => {
  state.game.isGm = true;
  const payload = {data: 1};
  setPlayerInfo(payload);

  t.true(store.dispatch.calledWith({
    type: 'SET_PLAYER_INFO',
    payload
  }));
});

test('it stores the player ID on the localStorage object', t => {
  const payload = {
    id: 'abcde'
  };

  setPlayerInfo(payload);

  t.true(set.calledWith(EIJ_PID, payload.id));
});

test('it does not attempt to store the player ID if it is not in the payload', t => {
  setPlayerInfo({});

  t.false(set.calledTwice);
});
