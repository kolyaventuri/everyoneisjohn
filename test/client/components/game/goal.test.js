import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import Goal from '../../../../client/components/game/goal';

const render = (props = {}) => shallow(<Goal {...props}/>);

test('it renders player goal', t => {
  const value = 'Abc';
  const wrapper = render({value});
  const goal = wrapper.find('[data-type="goal"]');

  t.is(goal.length, 1);
  t.is(goal.text(), value);
});
