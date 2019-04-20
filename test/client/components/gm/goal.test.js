import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import Goal from '../../../../client/components/gm/goal';

const render = (props = {}) => shallow(<Goal {...props}/>);

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
