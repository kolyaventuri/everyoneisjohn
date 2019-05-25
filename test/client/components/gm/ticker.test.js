import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';
import {stub} from 'sinon';

import Ticker from '../../../../client/components/gm/ticker';

const defaultProps = {
  value: 3,
  onChange: stub()
};

const render = (props = defaultProps) => {
  return shallow(<Ticker {...props}/>);
};

test('it renders the value', t => {
  const wrapper = render();
  const value = wrapper.find('[data-type="value"]');

  t.is(value.length, 1);
  t.is(value.text(), defaultProps.value.toString());
});

test('it increments the value upon clicking the plus button', t => {
  const wrapper = render();

  const button = wrapper.find('[data-action="increment"]');

  t.is(button.length, 1);

  button.simulate('click');

  t.true(defaultProps.onChange.calledWith(1));
});

test('it decrements the valeu upon clicking the minus button', t => {
  const wrapper = render();

  const button = wrapper.find('[data-action="decrement"]');

  t.is(button.length, 1);

  button.simulate('click');

  t.true(defaultProps.onChange.calledWith(-1));
});

test('does not render the value if renderValue is false', t => {
  const wrapper = render({value: 3, renderValue: false});
  const value = wrapper.find('[data-type="value"]');

  t.is(value.length, 0);
});
