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
    skill1: 'a',
    skill2: 'b',
    skill3: 'c',
    frozen: true
  };
  const wrapper = render(props);
  const skills = wrapper.find('[data-type="skills"]');

  t.is(skills.length, 1);

  const lis = skills.find('li');
  t.is(lis.length, 3);

  for (let i = 0; i < 3; i++) {
    const li = lis.at(i);

    t.is(li.text(), props[`skill${i + 1}`]);
  }
});

test('it renders players skils as text boxes if editing is not frozen', t => {
  const props = {
    skill1: 'a',
    skill2: 'b',
    skill3: 'c'
  };
  const wrapper = render(props);
  const skills = wrapper.find('[data-type="skills"]');
  const lis = skills.find('li');

  for (let i = 0; i < 3; i++) {
    const li = lis.at(i);
    const input = li.find('input');

    t.is(input.length, 1);
    t.is(input.props().value, props[`skill${i + 1}`]);
  }
});

test('it emits the skill to the server on input', t => {
  const clock = sinon.useFakeTimers();

  const props = {
    skill1: '',
    skill2: '',
    skill3: ''
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
    skill1: '',
    skill2: '',
    skill3: ''
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
    [`skill${index + 1}`]: value
  }));
});

test('it updates the state when the props are updated', t => {
  const props = {
    skill1: '',
    skill2: '',
    skill3: ''
  };
  const wrapper = render(props);

  const newProps = {
    skill1: 'a',
    skill2: 'b',
    skill3: 'c'
  };
  wrapper.setProps(newProps);
  wrapper.update();

  const instance = wrapper.instance();
  const {state} = instance;
  const {ids} = state;
  const expected = {
    ids,
    skill1: 'a',
    skill2: 'b',
    skill3: 'c'
  };

  t.deepEqual(state, expected);
});
