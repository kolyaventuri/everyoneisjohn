import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';
import {stub} from 'sinon';

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

  const select = wrapper.find('select');
  t.is(select.props().value, options[1]);
});

test('it fires an onChange hander when changed', t => {
  const options = ['a', 'b', 'c'];
  const onChange = stub();
  const wrapper = render({
    options,
    onChange
  });

  const select = wrapper.find('select');

  select.simulate('change', {target: {value: options[1]}});

  t.true(onChange.calledWith(options[1]));
});

test('it updates the seected option in state when changed', t => {
  const options = ['a', 'b', 'c'];
  const wrapper = render({
    options
  });

  const select = wrapper.find('select');

  select.simulate('change', {target: {value: options[1]}});

  const instance = wrapper.instance();
  const {state} = instance;

  t.is(state.selected, options[1]);
});
