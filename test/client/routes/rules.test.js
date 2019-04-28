import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import Rules from '../../../client/routes/rules';

const render = (props = {}) => shallow(<Rules {...props}/>);

test('it renders a Header component', t => {
  const wrapper = render();
  const header = wrapper.find('Header');

  t.is(header.length, 1);
});
