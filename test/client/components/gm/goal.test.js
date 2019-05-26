import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';
import {stub} from 'sinon';
import {MockSocket} from '../../../server/mocks/socket';

const socket = new MockSocket();
const player = 'some-id';

const Goal = proxyquire('../../../../client/components/gm/goal', {
  '../../socket': {default: socket}
}).default;

const render = (props = {}) => shallow(<Goal player={player} {...props}/>);

test('it renders the goal name', t => {
  const name = 'Some goal';
  const value = 2;

  const wrapper = render({name, value});

  const goalName = wrapper.find('[data-type="name"]');

  t.is(goalName.length, 1);
  t.is(goalName.text(), name);
});

test('it renders the goal value as a dropdown', t => {
  const name = 'Random';
  const value = 2;

  const wrapper = render({name, value});

  const goalValue = wrapper.find('Dropdown');

  t.is(goalValue.length, 1);
  t.is(goalValue.props().selected, value);
  t.deepEqual(goalValue.props().options, [1, 2, 3]);
});

test('it emits a setGoalLevel event when the dropdown is changed', t => {
  const name = 'Random';
  const value = 2;
  const onChange = stub();

  const wrapper = render({name, value, onChange});

  const goalValue = wrapper.find('Dropdown');

  goalValue.simulate('change', value);

  t.true(onChange.calledWith(value));
});

test('it calls the onComplete handler upon clicking the complete goal button', t => {
  const name = 'Some goal';
  const onComplete = stub();

  const wrapper = render({name, onComplete});
  const button = wrapper.find('button');

  t.is(button.length, 1);

  button.simulate('click');

  t.true(onComplete.called);
});

test('it renders null if no goal is set', t => {
  const wrapper = render({name: ''});

  t.is(wrapper.type(), null);
});

test('it renders a reject button next to the obsession', t => {
  const wrapper = render({name: 'Some goal'});

  const goalContainer = wrapper.find('[data-type="name"]').parent().shallow();

  const reject = goalContainer.find('Reject');

  t.is(reject.length, 1);
});

test('it emits a rejectGoal event when the reject button is clicked', t => {
  const wrapper = render({name: 'Some goal'});
  const reject = wrapper.find('Reject');

  reject.simulate('click');

  t.true(socket.emit.calledWith('rejectGoal', {player}));
});
