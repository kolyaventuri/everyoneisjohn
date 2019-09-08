import test from 'ava';
import React from 'react';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';
import {faVolume, faVolumeMute} from '@fortawesome/pro-regular-svg-icons';
import {SOUND, ON, OFF} from '../../../client/constants/settings';

const store = {dispatch: stub()};
const set = stub();

const SoundControl = proxyquire('../../../client/components/sound-control', {
  '../store': {store},
  'react-redux': {connect: () => stub().returnsArg(0)},
  '../utils/local-storage': {set}
}).default;

const render = (props = {}) => shallow(<SoundControl soundOn {...props}/>);

test('it renders the volume icon if the sound is on', t => {
  const wrapper = render();

  const icon = wrapper.find('FontAwesomeIcon');

  t.is(icon.length, 1);

  const props = icon.props();

  t.is(props.icon, faVolume);
});

test('it renders the volume-mute icon if the sound is on', t => {
  const wrapper = render({soundOn: false});

  const icon = wrapper.find('FontAwesomeIcon');

  t.is(icon.length, 1);

  const props = icon.props();

  t.is(props.icon, faVolumeMute);
});

test('it dispatches a SET_SOUND even when clicked, that turns the sound off', t => {
  const wrapper = render();
  const icon = wrapper.find('FontAwesomeIcon');

  icon.simulate('click');

  t.true(store.dispatch.calledWith({
    type: 'SET_SOUND',
    payload: {sound: false}
  }));
});

test('it dispatches a SET_SOUND even when clicked, that turns the sound on if it was off', t => {
  const wrapper = render({soundOn: false});
  const icon = wrapper.find('FontAwesomeIcon');

  icon.simulate('click');

  t.true(store.dispatch.calledWith({
    type: 'SET_SOUND',
    payload: {sound: true}
  }));
});

test('it sets localStorage values along with dispatch', t => {
  const wrapper = render();
  const icon = wrapper.find('FontAwesomeIcon');

  icon.simulate('click');

  t.true(set.calledWith(SOUND, OFF));
});

test('it sets localStorage values along with dispatch to turn sound on', t => {
  const wrapper = render({soundOff: true});
  const icon = wrapper.find('FontAwesomeIcon');

  icon.simulate('click');

  t.true(set.calledWith(SOUND, ON));
});
