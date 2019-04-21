import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import SkillList from '../../../../client/components/gm/skill-list';

const render = (children, props = {}) =>
  shallow(<SkillList {...props}>{children}</SkillList>);

test('it renders the players skills', t => {
  const items = ['A', 'B', 'C'];
  const wrapper = render(items);

  const skillsList = wrapper.find('ul');

  t.is(skillsList.length, 1);

  const skills = skillsList.find('li');

  t.is(skills.length, items.length);

  for (let i = 0; i < items.length; i++) {
    const skill = skills.at(i);

    t.is(skill.text(), items[i]);
  }
});

test('it renders null if no skills are set', t => {
  const items = ['', '', ''];
  const wrapper = render(items);

  t.is(wrapper.type(), null);
});
