import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import Player from '../../../../client/components/game/player';

const player = {
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

test('it renders the players willpower', t => {
  const wrapper = render();

  const willpower = wrapper.find('[data-type="willpower"]');

  t.is(willpower.length, 1);
  t.is(willpower.text(), player.willpower.toString());
});

test('it renders the players goal', t => {
  const wrapper = render();

  const goal = wrapper.find('[data-type="goal"]');

  t.is(goal.length, 1);
  t.is(goal.text(), player.goal);
});

test('it renders the players goal value', t => {
  const wrapper = render();

  const goalVal = wrapper.find('[data-type="goalLevel"]');

  t.is(goalVal.length, 1);
  t.is(goalVal.text(), player.goalLevel.toString());
});

test('it renders the players score', t => {
  const wrapper = render();

  const score = wrapper.find('[data-type="score"]');

  t.is(score.length, 1);
  t.is(score.text(), player.points.toString());
});

test('it renders the players skills', t => {
  const wrapper = render();

  const skillsList = wrapper.find('[data-type="skills"]');

  t.is(skillsList.length, 1);

  const skills = skillsList.find('li');

  t.is(skills.length, player.skills.length);

  for (let i = 0; i < player.skills.length; i++) {
    const skill = skills.at(i);

    t.is(skill.text(), player.skills[i]);
  }
});
