import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';
import {MockSocket} from '../../../server/mocks/socket';

const socket = new MockSocket();

const Name = proxyquire('../../../../client/components/game/name', {
  '../../socket': {default: socket}
}).default;

const render = (props = {}) => shallow(<Name {...props}/>);

test('it renders the players name', t => {
  const value = 'Joe';
  const wrapper = render({value});

  const name = wrapper.find('input[data-type="name"]');

  t.is(name.length, 1);
  t.is(name.props().defaultValue, value);
});

test('it updates the name on change', t => {
  const value = 'new value';
  const wrapper = render({value: 'Joe'});
  const name = wrapper.find('input[data-type="name"]');

  name.simulate('change', {target: {value}});

  t.true(socket.emit.calledWith('updatePlayer', {
    name: value
  }));
});
