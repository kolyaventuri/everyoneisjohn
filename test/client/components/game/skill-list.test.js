import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import sinon, {stub} from 'sinon';
import {shallow} from 'enzyme';
import {MockSocket} from '../../../server/mocks/socket';
import {DEBOUNCE_AMOUNT} from '../../../../client/constants/sockets';

const socket = new MockSocket();

const SkillList = proxyquire('../../../../client/components/game/skill-list', {
  '../../socket': {default: socket}
}).default;

const render = (props = {}) => shallow(<SkillList {...props}/>);

test('it renders player skills', t => {
  const props = {
    skills: ['a', 'b', 'c'],
    frozen: true
  };
  const wrapper = render(props);
  const skills = wrapper.find('[data-type="skills"]');

  t.is(skills.length, 1);

  const lis = skills.find('li');
  t.is(lis.length, 3);

  for (let i = 0; i < 3; i++) {
    const li = lis.at(i);

    t.is(li.text(), props.skills[i]);
  }
});

test('it renders players skils as text boxes if editing is not frozen', t => {
  const props = {
    skills: ['a', 'b', 'c']
  };
  const wrapper = render(props);
  const skills = wrapper.find('[data-type="skills"]');
  const lis = skills.find('li');

  for (let i = 0; i < 3; i++) {
    const li = lis.at(i);
    const input = li.find('input');

    t.is(input.length, 1);
    t.is(input.props().value, props.skills[i]);
  }
});

test('it emits the skill to the server on input', t => {
  const clock = sinon.useFakeTimers();

  const props = {
    skills: []
  };
  const wrapper = render(props);
  const skills = wrapper.find('[data-type="skills"]');
  const lis = skills.find('li');
  const input = lis.at(0).find('input');

  const value = 'abcde';

  input.simulate('input', {target: {value}, persist: () => {}});

  t.false(socket.emit.called);

  clock.tick(DEBOUNCE_AMOUNT);

  t.true(socket.emit.calledWith('updateStats', {
    skill: {
      number: 1,
      content: value
    }
  }));
});

test('it updates the state with the new skill on input', t => {
  const props = {
    skills: []
  };
  const index = 0;
  const wrapper = render(props);

  const skills = wrapper.find('[data-type="skills"]');
  const lis = skills.find('li');
  const input = lis.at(index).find('input');

  const instance = wrapper.instance();
  instance.setState = stub();

  const value = 'abcde';

  input.simulate('input', {target: {value}, persist: () => {}});

  // Not totally sure why enzyme isn't capturing the updated state, but this works
  t.true(instance.setState.calledWith({
    skills: [value]
  }));
});

test('it updates the state when the props are updated', t => {
  const props = {
    skills: []
  };
  const wrapper = render(props);

  const newProps = {
    skills: ['a']
  };
  wrapper.setProps(newProps);

  const instance = wrapper.instance();
  wrapper.update();
  const {state} = instance;
  const {ids} = state;
  const expected = {
    ids,
    skills: ['a']
  };

  t.deepEqual(state, expected);
});

test('it updates the state when skills are removed', t => {
  const props = {
    skills: ['a', 'b']
  };
  const wrapper = render(props);

  const newProps = {
    skills: ['b']
  };
  wrapper.setProps(newProps);

  const instance = wrapper.instance();
  wrapper.update();
  const {state} = instance;
  const {ids} = state;
  const expected = {
    ids,
    skills: ['b']
  };

  t.deepEqual(state, expected);
});

test('#handleInput deletes the index if value now empty', t => {
  const finalSkills = ['skill1', 'skill2'];
  const props = {
    skills: ['abcde', ...finalSkills]
  };
  const index = 0;
  const wrapper = render(props);

  const skills = wrapper.find('[data-type="skills"]');
  const lis = skills.find('li');
  const input = lis.at(index).find('input');

  const instance = wrapper.instance();
  instance.setState = stub();

  const value = '    ';

  input.simulate('input', {target: {value}, persist: () => {}});

  t.true(instance.setState.calledWith({
    skills: finalSkills
  }));
});

