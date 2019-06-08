import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {MockSocket} from '../../../server/mocks/socket';
import {DEBOUNCE_AMOUNT} from '../../../../client/constants/sockets';

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
  t.is(goal.props().value, value);
});

test('it emits the value to the server as you type', t => {
  const clock = sinon.useFakeTimers();

  const wrapper = render({value: '', frozen: false});
  const input = wrapper.find('input');
  const value = 'abc';

  input.simulate('input', {target: {value}, persist: () => {}});

  t.false(socket.emit.called);

  clock.tick(DEBOUNCE_AMOUNT);

  t.true(socket.emit.calledWith('updateStats', {goal: value}));

  clock.reset();
});

test('it updates the state with the new goal on input', t => {
  const wrapper = render({value: '', frozen: false});

  const value = 'Some goal';
  const input = wrapper.find('input');
  const instance = wrapper.instance();

  input.simulate('input', {target: {value}, persist: () => {}});

  const {state} = instance;

  t.is(state.value, value);
});
