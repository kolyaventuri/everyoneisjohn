import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';
import {stub} from 'sinon';

import Score from '../../../../client/components/gm/score';

const onChange = stub();

const render = (props = {}) => shallow(<Score onChange={onChange} {...props}/>);

test('it renders a Ticker', t => {
  const value = 3;
  const wrapper = render({value});
  const ticker = wrapper.find('Ticker');

  const props = ticker.props();

  t.is(props.value, value);
  t.is(props.onChange, onChange);
});
