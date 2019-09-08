import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';

const SoundControl = () => <div/>;
const Header = proxyquire('../../../client/components/header', {
  './sound-control': {default: SoundControl}
}).default;

const render = (props = {}) => shallow(<Header {...props}/>);

test('it renders a link back to the home page', t => {
  const wrapper = render();
  const link = wrapper.find('Link');

  t.is(link.length, 1);

  const props = link.props();

  t.is(props.to, '/');
});

test('it renders a SoundControl component', t => {
  const wrapper = render();

  const control = wrapper.find('SoundControl');

  t.is(control.length, 1);
});
