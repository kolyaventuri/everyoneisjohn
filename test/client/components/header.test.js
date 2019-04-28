import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import Header from '../../../client/components/header';

const render = (props = {}) => shallow(<Header {...props}/>);

test('it renders a link back to the home page', t => {
  const wrapper = render();
  const link = wrapper.find('Link');

  t.is(link.length, 1);

  const props = link.props();

  t.is(props.to, '/');
});
