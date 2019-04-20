import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';
import {stub} from 'sinon';
import {MockSocket} from '../../../server/mocks/socket';

const socket = new MockSocket();

const GameControls = proxyquire('../../../../client/components/gm/game-controls', {
  'react-redux': {connect: stub().returns(stub().returnsArg(0))},
  '../../socket': {default: socket}
}).default;

const render = (props = {mode: 'SETUP'}) => shallow(<GameControls {...props}/>);

test('it initially renders a Start Game button, in SETUP mode', t => {
  const wrapper = render();
  const buttons = wrapper.find('button');

  t.is(buttons.length, 1);

  t.is(buttons.at(0).text(), 'Start Game');
});

test('the Start Game button dispatches a startGame event', t => {
  const wrapper = render();
  const button = wrapper.find('button');

  button.simulate('click');

  t.true(socket.emit.calledWith('startGame'));
});

test('it renders voting buttons if in VOTING mode', t => {
  const wrapper = render({mode: 'VOTING'});
  const buttons = wrapper.find('button');

  t.is(buttons.length, 1);

  t.is(buttons.at(0).text(), 'Skip Bidding');
});

test('the Skip Bidding button dispatches a startPlaying event', t => {
  const wrapper = render({mode: 'VOTING'});
  const button = wrapper.find('button');

  button.simulate('click');

  t.true(socket.emit.calledWith('startPlaying'));
});

test('it renders playing buttons if in PLAYING mode', t => {
  const wrapper = render({mode: 'PLAYING'});
  const buttons = wrapper.find('button');

  t.is(buttons.length, 1);

  t.is(buttons.at(0).text(), 'Next Round');
});

test('the Next Round button dispatches a startBidding event', t => {
  const wrapper = render({mode: 'PLAYING'});
  const button = wrapper.find('button');

  button.simulate('click');

  t.true(socket.emit.calledWith('startBidding'));
});
