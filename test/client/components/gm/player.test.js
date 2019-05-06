import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';
import {MockSocket} from '../../../server/mocks/socket';

const socket = new MockSocket();

const Player = proxyquire('../../../../client/components/gm/player', {
  'react-redux': {connect: stub().returns(stub().returnsArg(0))},
  '../../socket': {default: socket}
}).default;

const player = {
  id: 'some-id',
  name: 'Mr. Some Name',
  willpower: 9,
  goal: 'Some goal',
  goalLevel: 2,
  skills: ['A', 'B', 'C'],
  points: 2
};

const render = (props = {}) => shallow(<Player data={player} {...props}/>);

test('it renders the players name', t => {
  const wrapper = render();

  const name = wrapper.find('[data-type="name"]');

  t.is(name.length, 1);
  t.is(name.text(), player.name);
});

test('it renders a willpower component', t => {
  const wrapper = render();

  const willpower = wrapper.find('Willpower');

  t.is(willpower.length, 1);

  const props = willpower.props();
  t.is(props.value, player.willpower);
});

test('it emits a giveWillpower event on changing the willpower', t => {
  const wrapper = render();

  const willpower = wrapper.find('Willpower');
  const amount = 1;

  willpower.simulate('change', amount);

  t.true(socket.emit.calledWith('giveWillpower', {
    amount,
    player: player.id
  }));
});

test('it renders a goal component', t => {
  const wrapper = render();
  const goal = wrapper.find('Goal');

  t.is(goal.length, 1);
  const props = goal.props();

  t.is(props.name, player.goal);
  t.is(props.value, player.goalLevel);
});

test('it emits a setGoalLevel event on changing the goal level', t => {
  const wrapper = render();
  const goal = wrapper.find('Goal');
  const value = 2;

  goal.simulate('change', value);

  t.true(socket.emit.calledWith('setGoalLevel', {amount: value, player: player.id}));
});

test('it emits a givePoints event, with an amount equal to the goal, upon completing the goal', t => {
  const wrapper = render();
  const goal = wrapper.find('Goal');

  goal.props().onComplete();

  t.true(socket.emit.calledWith('givePoints', {amount: player.goalLevel, player: player.id}));
});

test('it renders a Score component', t => {
  const wrapper = render();
  const score = wrapper.find('Score');

  t.is(score.length, 1);
  t.is(score.props().value, player.points);
});

test('it emits a givePoints event on changing the score', t => {
  const wrapper = render();

  const willpower = wrapper.find('Score');
  const amount = 1;

  willpower.simulate('change', amount);

  t.true(socket.emit.calledWith('givePoints', {
    amount,
    player: player.id
  }));
});

test('it renders a SkillList component', t => {
  const wrapper = render();
  const skills = wrapper.find('SkillList');
  const props = skills.props();

  t.is(skills.length, 1);
  t.deepEqual(props.children, player.skills);
  t.is(props.player, player.id);
});
