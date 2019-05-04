import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';
import {stub} from 'sinon';

const store = {
  dispatch: stub()
};

const push = stub().returnsArg(0);

const JoinInput = proxyquire('../../../client/components/join-input', {
  'connected-react-router': {push},
  '../store': {store}
}).default;

const render = (props = {}) => shallow(<JoinInput {...props}/>);

test('renders an input', t => {
  const wrapper = render();
  const input = wrapper.find('input');

  t.is(input.length, 1);
});

test('renders a button', t => {
  const wrapper = render();
  const button = wrapper.find('button');

  t.is(button.length, 1);
});

test('updates the state upon input keyUp', t => {
  const wrapper = render();
  const instance = wrapper.instance();
  const input = wrapper.find('input');
  const value = 'aaa';

  input.simulate('keyUp', {currentTarget: {value}});

  const {state} = instance;

  t.is(state.gameId, value);
});

test('redirects to the game upon clicking the button', t => {
  const wrapper = render();
  const button = wrapper.find('button');
  const gameId = 'abcde';

  const instance = wrapper.instance();
  instance.setState({gameId});

  button.simulate('click', {preventDefault: () => {}});

  t.true(store.dispatch.calledWith(push(`/game/${gameId}`)));
});
