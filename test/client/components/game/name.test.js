import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {MockSocket} from '../../../server/mocks/socket';
import {DEBOUNCE_AMOUNT} from '../../../../client/constants/sockets';

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

test('it updates the name on change, after a delay', t => {
  const clock = sinon.useFakeTimers();

  const value = 'new value';
  const wrapper = render({value: 'Joe'});
  const name = wrapper.find('input[data-type="name"]');

  name.simulate('change', {target: {value}});
  t.false(socket.emit.called);

  clock.tick(DEBOUNCE_AMOUNT);

  t.true(socket.emit.calledWith('updatePlayer', {
    name: value
  }));

  clock.restore();
});
