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
  points: 0,
  mode: 'PLAYING'
};

const render = (props = defaultProps) => {
  return shallow(<PlayerInfo {...props}/>);
};

test('it renders a Name component', t => {
  const wrapper = render();
  const name = wrapper.find('Name');

  t.is(name.length, 1);
  t.is(name.props().value, defaultProps.name);
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

test('it does not render a Bidding component in SETUP mode', t => {
  const wrapper = render({mode: 'SETUP'});
  const bidding = wrapper.find('Bidding');

  t.is(bidding.length, 0);
});

test('it does not render a Bidding component in PLAYING mode', t => {
  const wrapper = render({mode: 'PLAYING'});
  const bidding = wrapper.find('Bidding');

  t.is(bidding.length, 0);
});

test('it renders a Bidding component in VOTING mode', t => {
  const wrapper = render({
    ...defaultProps,
    mode: 'VOTING'
  });
  const bidding = wrapper.find('Bidding');

  t.is(bidding.length, 1);
  const props = bidding.props();

  t.is(props.max, defaultProps.willpower);
});
