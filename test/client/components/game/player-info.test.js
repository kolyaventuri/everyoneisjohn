import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';
import {stub} from 'sinon';

const PlayerInfo = proxyquire('../../../../client/components/game/player-info', {
  'react-redux': {connect: stub().returns(stub().returnsArg(0))}
}).default;

const defaultProps = {
  name: 'Mr. Some Name',
  willpower: 10,
  skills: ['A', 'B', 'C'],
  goal: 'Goal',
  points: 0
};

const render = (props = defaultProps) => {
  return shallow(<PlayerInfo {...props}/>);
};

test('it renders player name', t => {
  const wrapper = render();
  const name = wrapper.find('.name');

  t.is(name.length, 1);
  t.is(name.text(), `Name: ${defaultProps.name}`);
});

test('it renders a Willpower component', t => {
  const wrapper = render();
  const willpower = wrapper.find('Willpower');

  t.is(willpower.length, 1);
  t.is(willpower.props().value, defaultProps.willpower);
});

test('it renders a Score component', t => {
  const wrapper = render();
  const score = wrapper.find('Score');

  t.is(score.length, 1);
  t.is(score.props().value, defaultProps.points);
});

test('it renders a Goal component', t => {
  const wrapper = render();
  const goal = wrapper.find('Goal');

  t.is(goal.length, 1);
  t.is(goal.props().value, defaultProps.goal);
});

test('it renders a SkillList component', t => {
  const wrapper = render();
  const list = wrapper.find('SkillList');

  t.is(list.length, 1);
  t.is(list.props().items, defaultProps.skills);
});
