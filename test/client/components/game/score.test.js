import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import Score from '../../../../client/components/game/score';

const render = (props = {}) => shallow(<Score {...props}/>);

test('it renders player score', t => {
  const value = 4;
  const wrapper = render({value});
  const score = wrapper.find('[data-type="score"]');

  t.is(score.length, 1);
  t.is(score.text(), `${value}`);
});
