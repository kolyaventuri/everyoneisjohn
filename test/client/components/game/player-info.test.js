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

test('it renders player willpower', t => {
  const wrapper = render();
  const willpower = wrapper.find('.willpower');

  t.is(willpower.length, 1);
  t.is(willpower.text(), `Willpower: ${defaultProps.willpower}`);
});

test('it renders player score', t => {
  const wrapper = render();
  const score = wrapper.find('.score');

  t.is(score.length, 1);
  t.is(score.text(), `Score: ${defaultProps.points}`);
});

test('it renders player goal', t => {
  const wrapper = render();
  const goal = wrapper.find('.goal');

  t.is(goal.length, 1);
  t.is(goal.text(), `Goal: ${defaultProps.goal}`);
});

test('it renders player skills', t => {
  const wrapper = render();
  const skills = wrapper.find('.skills');

  t.is(skills.length, 1);
  t.is(skills.text(), `Skills: ${defaultProps.skills.join(', ')}`);
});
