import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';

const dispatch = stub();
const store = {dispatch};

proxyquire.noCallThru();
const setSkill = proxyquire('../../../../client/socket/actions/set-skill', {
  '../../store': {store}
}).default;

test('updates the redux store with the new skill', t => {
  const index = 0;
  const skill = 'skill';

  setSkill({index, skill});

  t.true(dispatch.calledWith({
    type: 'SET_PLAYER_INFO',
    payload: {
      [`skill${index + 1}`]: skill
    }
  }));
});
