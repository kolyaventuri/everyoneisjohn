import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import Name from '../../../../client/components/game/name';

const render = (props = {}) => shallow(<Name {...props}/>);

test('it renders the players name', t => {
  const value = 'Joe';
  const wrapper = render({value});

  const name = wrapper.find('[data-type="name"]');

  t.is(name.length, 1);
  t.is(name.text(), value);
});
