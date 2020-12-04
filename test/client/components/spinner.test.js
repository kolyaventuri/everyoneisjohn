import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

import Spinner from '../../../client/components/spinner';

test('it renders a spinner icon', t => {
  const wrapper = shallow(<Spinner/>);

  const icon = wrapper.find('FontAwesomeIcon');

  t.is(icon.length, 1);
  t.is(icon.props().icon, faSpinner);
});
