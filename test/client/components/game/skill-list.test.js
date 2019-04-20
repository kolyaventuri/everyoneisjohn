import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import SkillList from '../../../../client/components/game/skill-list';

const render = (children, props = {}) =>
  shallow(
    <SkillList {...props}>
      {children}
    </SkillList>
  );

test('it renders player skills', t => {
  const children = ['a', 'b', 'c'];
  const wrapper = render(children);
  const skills = wrapper.find('[data-type="skills"]');

  t.is(skills.length, 1);

  const lis = skills.find('li');
  t.is(lis.length, children.length);

  for (let i = 0; i < children.length; i++) {
    const li = lis.at(i);

    t.is(li.text(), children[i]);
  }
});
