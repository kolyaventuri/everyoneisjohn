import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';

class PlayerInfo extends React.Component {
  render() {
    return null;
  }
}

const GamePanel = proxyquire('../../../../client/components/game/panel', {
  './player-info': {default: PlayerInfo}
}).default;

const render = (props = {}) => shallow(<GamePanel {...props}/>);

test('it renders a PlayerInfo component', t => {
  const wrapper = render();

  const info = wrapper.find('PlayerInfo');

  t.is(info.length, 1);
});
