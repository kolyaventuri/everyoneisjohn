import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';
import {MockSocket} from '../../../server/mocks/socket';

const socket = new MockSocket();
const player = 'some-id';

const SkillList = proxyquire('../../../../client/components/gm/skill-list', {
  '../../socket': {default: socket}
}).default;

const render = (children, props = {}) =>
  shallow(<SkillList player={player} {...props}>{children}</SkillList>);

test('it renders the players skills', t => {
  const items = ['A', 'B', 'C'];
  const wrapper = render(items);

  const skillsList = wrapper.find('ul');

  t.is(skillsList.length, 1);

  const skills = skillsList.find('li');

  t.is(skills.length, items.length);

  for (let i = 0; i < items.length; i++) {
    const skill = skills.at(i).find('p').first();

    t.is(skill.text(), items[i]);
  }
});

test('it renders null if no skills are set', t => {
  const items = ['', '', ''];
  const wrapper = render(items);

  t.is(wrapper.type(), null);
});

test('it renders a reject button next to each skill', t => {
  const items = ['A', 'B', 'C'];
  const wrapper = render(items);

  const skills = wrapper.find('li');
  const skill = skills.at(0);

  const reject = skill.find('Reject');

  t.is(reject.length, 1);
});

test('it emits a rejectSkill event when the reject button is clicked', t => {
  const items = ['A', 'B', 'C'];
  const wrapper = render(items);
  const skills = wrapper.find('li');
  const skill = skills.at(0);
  const reject = skill.find('Reject');

  reject.simulate('click');

  t.true(socket.emit.calledWith('rejectSkill', {index: 0, player}));
});
