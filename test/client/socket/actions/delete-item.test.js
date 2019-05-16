import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';

const dispatch = stub();
const getState = stub();
const store = {dispatch, getState};

proxyquire.noCallThru();
const deleteItem = proxyquire('../../../../client/socket/actions/delete-item', {
  '../../store': {store}
}).default;

test('updates the redux store with the game', t => {
  const payload = {
    type: 'skill',
    index: 1
  };

  const state = {
    player: {
      skills: ['a', 'b', 'c']
    }
  };

  getState.returns(state);

  const skills = [...(state.player.skills)];
  skills[payload.index] = '';

  deleteItem(payload);

  t.true(dispatch.calledWith({
    type: 'SET_PLAYER_INFO',
    payload: {
      skills
    }
  }));
});
