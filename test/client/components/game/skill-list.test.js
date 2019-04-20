import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';
import {MockSocket} from '../../../server/mocks/socket';

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

test('when editing is not frozen, it renders a submit button next to each skill', t => {
  const items = ['a', 'b', 'c'];
  const wrapper = render({items, frozen: false});
  const skills = wrapper.find('[data-type="skills"]');
  const lis = skills.find('li');

  for (let i = 0; i < items.length; i++) {
    const li = lis.at(i);
    const button = li.find('button');

    t.is(button.length, 1);
  }
});

test('it updates the state for each skill on input change', t => {
  const items = ['a', 'b', 'c'];
  const wrapper = render({items, frozen: false});
  const skills = wrapper.find('[data-type="skills"]');
  const lis = skills.find('li');
  const input = lis.at(0).find('input');

  const value = 'abcde';

  input.simulate('change', {target: {value}});

  const {state} = wrapper.instance();

  t.is(state.items[0], value);
});

test('it emits the skill upon clicking submit', t => {
  const items = ['a', 'b', 'c'];
  const wrapper = render({items, frozen: false});
  const skills = wrapper.find('[data-type="skills"]');
  const lis = skills.find('li');
  const button = lis.at(0).find('button');

  button.simulate('click');

  t.true(socket.emit.calledWith('updateStats', {
    skill: {
      number: 1,
      content: items[0]
    }
  }));
});

test('it does not emit a skill if it is blank after trim', t => {
  const items = ['  ', 'b', 'c'];
  const wrapper = render({items, frozen: false});
  const skills = wrapper.find('[data-type="skills"]');
  const lis = skills.find('li');
  const button = lis.at(0).find('button');

  button.simulate('click');

  t.true(socket.emit.calledWith('updateStats', {
    skill: {
      number: 1,
      content: items[0].trim()
    }
  }));
});
