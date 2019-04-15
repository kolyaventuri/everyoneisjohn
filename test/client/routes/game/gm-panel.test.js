import test from 'ava';
import {shallow} from 'enzyme';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';
import uuid from 'uuid/v4';
import React from 'react';

const GMPanel = proxyquire('../../../../client/routes/game/gm-panel', {
  'react-router-dom': {withRouter: stub().returnsArg(0)},
  'react-redux': {connect: stub().returns(stub().returnsArg(0))}
}).default;

const render = (props = {}) => {
  return shallow(<GMPanel {...props}/>);
};

test('it renders a list of Players', t => {
  const players = [{id: uuid()}, {id: uuid()}];
  const wrapper = render({players});

  const playerElems = wrapper.find('Player');

  t.is(playerElems.length, 2);

  t.deepEqual(playerElems.at(0).props().data, players[0]);
  t.deepEqual(playerElems.at(1).props().data, players[1]);
});

