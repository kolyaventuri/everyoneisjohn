import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {MockSocket} from '../../../server/mocks/socket';
import {DEBOUNCE_AMOUNT} from '../../../../client/constants/sockets';

const socket = new MockSocket();

const SkillList = proxyquire('../../../../client/components/game/skill-list', {
  '../../socket': {default: socket}
}).default;

const render = (props = {}) => shallow(<SkillList frozen {...props}/>);

test('it renders player skills', t => {
  const items = ['a', 'b', 'c'];
  const wrapper = render({items});
  const skills = wrapper.find('[data-type="skills"]');

  t.is(skills.length, 1);

  const lis = skills.find('li');
  t.is(lis.length, items.length);

  for (let i = 0; i < items.length; i++) {
    const li = lis.at(i);

    t.is(li.text(), items[i]);
  }
});

test('it renders players skils as text boxes if editing is not frozen', t => {
  const items = ['a', 'b', 'c'];
  const wrapper = render({items, frozen: false});
  const skills = wrapper.find('[data-type="skills"]');
  const lis = skills.find('li');

  for (let i = 0; i < items.length; i++) {
    const li = lis.at(i);
    const input = li.find('input');

    t.is(input.length, 1);
    t.is(input.props().defaultValue, items[i]);
  }
});

test('it emits the skill to the server on input change', t => {
  const clock = sinon.useFakeTimers();

  const items = ['a', 'b', 'c'];
  const wrapper = render({items, frozen: false});
  const skills = wrapper.find('[data-type="skills"]');
  const lis = skills.find('li');
  const input = lis.at(0).find('input');

  const value = 'abcde';

  input.simulate('change', {target: {value}});

  t.false(socket.emit.called);

  clock.tick(DEBOUNCE_AMOUNT);

  t.true(socket.emit.calledWith('updateStats', {
    skill: {
      number: 1,
      content: value
    }
  }));
});
