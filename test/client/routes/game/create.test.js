import test from 'ava';
import {shallow} from 'enzyme';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';
import React from 'react';

const store = {
  dispatch: stub()
};

const CreateGame = proxyquire('../../../../src/routes/game/create', {
  'react-router': {withRouter: stub().returnsArg(0)},
  'react-redux': {connect: stub().returns(stub().returnsArg(0))},
  '../../store': {store}
}).default;

const render = (props = {}) => {
  return shallow(<CreateGame gameId={null} isGm={null} {...props}/>);
};

test('it renders a loader', t => {
  const wrapper = render();

  const loader = wrapper.find('p');

  t.is(loader.length, 1);
  t.is(loader.text(), 'Loading...');
});
