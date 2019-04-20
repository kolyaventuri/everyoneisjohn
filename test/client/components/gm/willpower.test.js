import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import Willpower from '../../../../client/components/gm/willpower';

const defaultProps = {
  value: 3,
  onChange: () => {}
};

const render = (props = defaultProps) => shallow(<Willpower {...props}/>);

test('it renders a Ticker', t => {
  const wrapper = render();
  const ticker = wrapper.find('Ticker');

  const props = ticker.props();

  t.is(props.value, defaultProps.value);
  t.is(props.onChange, defaultProps.onChange);
});
