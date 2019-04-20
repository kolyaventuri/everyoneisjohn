import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import Dropdown from '../../../client/components/dropdown';

const render = (props = {}) => shallow(<Dropdown {...props}/>);

test('it renders a select element', t => {
  const wrapper = render({options: []});

  const select = wrapper.find('select');

  t.is(select.length, 1);
});

test('it renders all the options', t => {
  const options = ['a', 'b', 'c'];
  const wrapper = render({
    options
  });

  const opts = wrapper.find('select option');

  t.is(opts.length, options.length);

  for (let i = 0; i < options.length; i++) {
    const opt = opts.at(i);
    t.is(opt.text(), options[i]);
    t.is(opt.props().value, options[i]);
  }
});

test('it can render with a selected option', t => {
  const options = ['a', 'b', 'c'];
  const wrapper = render({
    options,
    selected: options[1]
  });

  const opts = wrapper.find('select option');
  const opt = opts.at(1);

  t.is(opt.text(), options[1]);
  t.true(opt.props().selected);
});
