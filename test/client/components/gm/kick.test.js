import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';
import {MockSocket} from '../../../server/mocks/socket';

const socket = new MockSocket();

const Kick = proxyquire('../../../../client/components/gm/kick', {
  '../../socket': {default: socket}
}).default;

const render = (props = {}) => shallow(<Kick {...props}/>);

test('it renders an X button', t => {
  const wrapper = render({player: 'id'});
  const button = wrapper.find('[data-type="button"]');

  t.is(button.length, 1);
});

test('it emits a kickPlayer event when clicked', t => {
  const player = 'some-id';

  const wrapper = render({player});
  const button = wrapper.find('[data-type="button"]');

  button.simulate('click');

  t.true(socket.emit.calledWith('kickPlayer', {player}));
});
