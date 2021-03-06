import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';

const dispatch = stub();
const store = {dispatch};

proxyquire.noCallThru();
const setSkill = proxyquire('../../../../client/socket/actions/set-skills', {
  '../../store': {store}
}).default;

test('updates the redux store with the new skills', t => {
  const skills = ['skill'];

  setSkill({skills});

  t.true(dispatch.calledWith({
    type: 'SET_PLAYER_INFO',
    payload: {
      skills
    }
  }));
});
