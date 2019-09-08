import test from 'ava';
import React from 'react';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';
import {faVolume, faVolumeMute} from '@fortawesome/pro-regular-svg-icons';

const SoundControl = proxyquire('../../../client/components/sound-control', {
  'react-redux': {connect: () => stub().returnsArg(0)}
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
