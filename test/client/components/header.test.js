import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';
import {stub} from 'sinon';

import {CONNECTED, FAILING} from '../../../client/constants/connection-status';

const SoundControl = () => <div/>;
const Header = proxyquire('../../../client/components/header', {
  './sound-control': {default: SoundControl},
  'react-redux': {connect: () => stub().returnsArg(0)}
}).default;

const render = (props = {}) => shallow(<Header connectionStatus={CONNECTED} {...props}/>);

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

test('it does not render a Spinner by default', t => {
  const wrapper = render();
  const spinner = wrapper.find('Spinner');

  t.is(spinner.length, 0);
});

test('it renders a spinner if the connectionStatus is FAILING', t => {
  const wrapper = render({connectionStatus: FAILING});
  const spinner = wrapper.find('Spinner');

  t.is(spinner.length, 1);
});
