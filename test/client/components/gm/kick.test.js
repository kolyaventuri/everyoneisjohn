import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';
import {stub} from 'sinon';

import Kick from '../../../../client/components/gm/kick';

const render = (props = {}) => shallow(<Kick {...props}/>);

test('it renders an X button', t => {
  const player = 'some-id';

  const wrapper = render({player});
  const button = wrapper.find('[data-type="button"]');

  t.is(button.length, 1);
});
