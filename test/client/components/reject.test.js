import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';
import {stub} from 'sinon';
import {faTimes} from '@fortawesome/free-regular-svg-icons';

import Reject from '../../../client/components/reject';

const defaultProps = {
  onClick: () => {}
};

const render = (props = defaultProps) => shallow(<Reject {...props}/>);

test('it renders an X icon', t => {
  const wrapper = render();

  const icon = wrapper.find('FontAwesomeIcon');

  t.is(icon.length, 1);

  const props = icon.props();

  t.is(props.icon, faTimes);
});

test('it calls the onClick handler when clicked', t => {
  const onClick = stub();
  const wrapper = render({onClick});

  const p = wrapper.find('p');

  p.simulate('click');

  t.true(onClick.called);
});
