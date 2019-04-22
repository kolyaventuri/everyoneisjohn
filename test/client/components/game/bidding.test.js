import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import Bidding from '../../../../client/components/game/bidding';

const render = (props = {}) => shallow(<Bidding max={10} {...props}/>);

test('it renders a Ticker', t => {
  const wrapper = render();
  const ticker = wrapper.find('Ticker');

  t.is(ticker.length, 1);
});

test('it initializes to 0', t => {
  const wrapper = render();
  const ticker = wrapper.find('Ticker');

  t.is(ticker.props().value, 0);
});

test('it can increment / decrement the bid', t => {
  const wrapper = render();
  const instance = wrapper.instance();
  const ticker = wrapper.find('Ticker');

  ticker.simulate('change', 1);

  t.is(instance.state.value, 1);

  ticker.simulate('change', -1);

  t.is(instance.state.value, 0);
});

test('it cannot incremenet above the maximum', t => {
  const wrapper = render({max: 1});
  const instance = wrapper.instance();
  const ticker = wrapper.find('Ticker');

  ticker.simulate('change', 1);
  ticker.simulate('change', 1);

  t.is(instance.state.value, 1);
});

test('it cannot decrement below 0', t => {
  const wrapper = render();
  const instance = wrapper.instance();
  const ticker = wrapper.find('Ticker');

  ticker.simulate('change', -1);

  t.is(instance.state.value, 0);
});
