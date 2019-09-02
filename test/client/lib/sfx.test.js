import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

const effects = [
  {name: 'foo', file: 'foobar'}
];

const addStub = stub();
class SFXManager {
  add = addStub;
}

proxyquire.noCallThru();
proxyquire('../../../client/lib/sfx', {
  '../classes/sfx-manager': SFXManager,
  '../constants/effects': effects
});

test('it adds all the effects from the constants file', t => {
  const {name, file} = effects[0];
  t.true(addStub.calledWithExactly({name, file}));
});
