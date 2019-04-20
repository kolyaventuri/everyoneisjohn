import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import Goal from '../../../../client/components/gm/goal';

const render = (props = {}) => shallow(<Goal {...props}/>);

test('it renders with the right data', t => {
  const name = 'Some goal';
  const value = 2;

  const wrapper = render({name, value});

  const goalName = wrapper.find('[data-type="name"]');
  const goalValue = wrapper.find('[data-type="value"]');

  t.is(goalName.length, 1);
  t.is(goalName.text(), name);

  t.is(goalValue.length, 1);
  t.is(goalValue.text(), value.toString());
});
