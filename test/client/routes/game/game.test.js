import test from 'ava';
import {shallow} from 'enzyme';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';
import React from 'react';

import Audio from '../../../helpers/mock-audio';

global.Audio = Audio;

const Game = proxyquire('../../../../client/routes/game/index.js', {
  'react-router-dom': {withRouter: stub().returnsArg(0)},
  'react-redux': {connect: stub().returns(stub().returnsArg(0))}
}).default;

const match = {params: {id: 'ABCDE'}};

const render = (props = {}) => {
  return shallow(<Game match={match} {...props}/>);
};

test('it renders a loader', t => {
  const wrapper = render();

  const loader = wrapper.find('p');

  t.is(loader.length, 1);
  t.is(loader.text(), 'Loading...');
});

test('it renders a GamePanel once the game is connected', t => {
  const wrapper = render();
  wrapper.instance().setState({waiting: false});

  const panel = wrapper.find('GamePanel');

  t.is(panel.length, 1);
});

test('it renders a Header component', t => {
  const wrapper = render();
  wrapper.instance().setState({waiting: false});
  const header = wrapper.find('Header');

  t.is(header.length, 1);
});
