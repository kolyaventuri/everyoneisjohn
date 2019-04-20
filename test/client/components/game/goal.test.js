import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';
import {MockSocket} from '../../../server/mocks/socket';

const socket = new MockSocket();

const Goal = proxyquire('../../../../client/components/game/goal', {
  '../../socket': {default: socket}
}).default;

const render = (props = {}) => shallow(<Goal frozen {...props}/>);

test('it renders player goal', t => {
  const value = 'Abc';
  const wrapper = render({value});
  const goal = wrapper.find('[data-type="goal"]');

  t.is(goal.length, 1);
  t.is(goal.text(), value);
});

test('it renders a text box of the players goal if editing is not frozen', t => {
  const value = 'Abc';
  const wrapper = render({value, frozen: false});

  const goal = wrapper.find('input[type="text"]');

  t.is(goal.length, 1);
  t.is(goal.props().defaultValue, value);
});

test('it stores the value in the state as you type', t => {
  const wrapper = render({value: '', frozen: false});
  const instance = wrapper.instance();
  const input = wrapper.find('input');
  const value = 'abc';

  input.simulate('change', {target: {value}});

  const {state} = instance;
  t.is(state.value, value);
});

test('it renders a button to submit your goal if editing is not frozen', t => {
  const value = 'abc';
  const wrapper = render({value, frozen: false});

  const button = wrapper.find('button');

  t.is(button.length, 1);

  button.simulate('click');

  t.true(socket.emit.calledWith('updateStats', {
    goal: value
  }));
});
