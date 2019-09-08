import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';
import {MockSocket} from '../../../server/mocks/socket';
import Audio from '../../../helpers/mock-audio';
import SFX from '../../mocks/sfx';
import {ALERT} from '../../../../client/constants/effects';

global.Audio = Audio;
const socket = new MockSocket();

const sfxs = {
  [ALERT]: new SFX(ALERT)
};

const manager = {
  get: name => sfxs[name]
};

const Bidding = proxyquire('../../../../client/components/game/bidding', {
  '../../socket': {default: socket},
  '../../lib/sfx': {default: manager}
}).default;

const render = (props = {}) => shallow(<Bidding max={10} {...props}/>);

test('it renders a Ticker', t => {
  const wrapper = render();
  const ticker = wrapper.find('Ticker');

  t.is(ticker.length, 1);
});

test('it initializes to 0', t => {
  const wrapper = render();
  const ticker = wrapper.find('Ticker');

  t.is(ticker.props().value, 0);
});

test('it can increment / decrement the bid', t => {
  const wrapper = render();
  const instance = wrapper.instance();
  const ticker = wrapper.find('Ticker');

  ticker.simulate('change', 1);

  t.is(instance.state.value, 1);

  ticker.simulate('change', -1);

  t.is(instance.state.value, 0);
});

test('it cannot incremenet above the maximum', t => {
  const wrapper = render({max: 1});
  const instance = wrapper.instance();
  const ticker = wrapper.find('Ticker');

  ticker.simulate('change', 1);
  ticker.simulate('change', 1);

  t.is(instance.state.value, 1);
});

test('it cannot decrement below 0', t => {
  const wrapper = render();
  const instance = wrapper.instance();
  const ticker = wrapper.find('Ticker');

  ticker.simulate('change', -1);

  t.is(instance.state.value, 0);
});

test('it submits your bid upon clicking the submit button', t => {
  const value = 3;
  const wrapper = render();
  const instance = wrapper.instance();
  instance.setState({value});

  const button = wrapper.find('button');

  t.is(button.length, 1);

  button.simulate('click');

  t.true(socket.emit.calledWith('submitBid', {amount: value}));
});

test('once you have submitted your bid, the component vanishes', t => {
  const wrapper = render();
  const button = wrapper.find('button');

  button.simulate('click');

  wrapper.update();

  t.is(wrapper.type(), null);
});

test('loads in the `alert` effect upon being constructed', t => {
  const wrapper = render();
  const instance = wrapper.instance();

  const {_alertEffect} = instance;

  t.true(_alertEffect instanceof SFX);
  t.is(_alertEffect.name, ALERT);
});

test('plays the alert effect file upon mounting', t => {
  const wrapper = render();
  const instance = wrapper.instance();

  const {_alertEffect} = instance;

  instance.componentDidMount();

  t.true(_alertEffect.play.called);
});

test('does not error if alert effect didn\'t load properly', t => {
  const wrapper = render();
  const instance = wrapper.instance();
  instance._alertEffect = null;

  const fn = () => instance.componentDidMount();

  t.notThrows(fn);
});
