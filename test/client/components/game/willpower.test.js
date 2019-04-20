import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import Willpower from '../../../../client/components/game/willpower';

const render = (props = {}) => shallow(<Willpower {...props}/>);

test('it renders player willpower', t => {
  const value = 9;
  const wrapper = render({value});
  const willpower = wrapper.find('[data-type="willpower"]');

  t.is(willpower.length, 1);
  t.is(willpower.text(), `${value}`);
});
