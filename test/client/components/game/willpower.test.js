import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';
import {MockSocket} from '../../../server/mocks/socket';

const mockSocket = new MockSocket();

const Willpower = proxyquire('../../../../client/components/game/willpower', {
  '../../socket': {default: mockSocket}
}).default;

const defaultProps = {
  playerId: 'some-id',
  value: 3
};

const render = (props = defaultProps) => {
  return shallow(<Willpower {...props}/>);
};

test('it renders player willpower', t => {
  const wrapper = render();
  const value = wrapper.find('[data-type="value"]');

  t.is(value.length, 1);
  t.is(value.text(), defaultProps.value.toString());
});

test('it increments the willpower upon clicking the plus button', t => {
  const wrapper = render();

  const button = wrapper.find('[data-action="increment"]');

  t.is(button.length, 1);

  button.simulate('click');

  t.true(mockSocket.emit.calledWith('giveWillpower', {
    amount: 1,
    player: defaultProps.playerId
  }));
});

test('it decrements the willpower upon clicking the minus button', t => {
  const wrapper = render();

  const button = wrapper.find('[data-action="decrement"]');

  t.is(button.length, 1);

  button.simulate('click');

  t.true(mockSocket.emit.calledWith('giveWillpower', {
    amount: -1,
    player: defaultProps.playerId
  }));
});
