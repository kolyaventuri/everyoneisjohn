import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import sinon, {stub} from 'sinon';
import {shallow} from 'enzyme';
import {MockSocket} from '../../../server/mocks/socket';
import {DEBOUNCE_AMOUNT} from '../../../../client/constants/sockets';

const socket = new MockSocket();
const dispatch = stub();
const store = {
  dispatch
};

const SkillList = proxyquire('../../../../client/components/game/skill-list', {
  '../../socket': {default: socket},
  '../../store': {store}
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

test('it does not update the state of a textbox if it has focus when the props are updated', t => {
  const props = {
    skills: ['a', 'b']
  };
  const wrapper = render(props);
  const instance = wrapper.instance();
  const value = 'abcd';

  const getInput = () => {
    const skills = wrapper.find('[data-type="skills"]');
    const lis = skills.find('li');
    return lis.at(1).find('input').shallow();
  };

  let input = getInput();
  input.simulate('input', {target: {value}, persist: () => {}});

  const {hasFocus} = global.document;
  global.document.hasFocus = stub().returns(true);

  const newProps = {
    skills: ['a', 'b']
  };
  const prevProps = wrapper.props();
  wrapper.setProps(newProps);
  instance.componentDidUpdate(prevProps);

  input = getInput();

  t.is(input.props().value, value);
  global.document.hasFocus = hasFocus;
});

test('it renders a prompt for the 3rd skill if you have entered two skills', t => {
  const props = {
    skills: ['a', 'b']
  };
  const wrapper = render(props);
  const skills = wrapper.find('[data-type="skills"]');
  const lis = skills.find('li');
  const prompt = lis.at(2);

  t.is(prompt.length, 1);
  t.true(prompt.text().startsWith('Add a 3rd skill for 3 willpower?'));
});

test('the willpower prompt renders a plus icon', t => {
  const props = {
    skills: ['a', 'b']
  };
  const wrapper = render(props);
  const skills = wrapper.find('[data-type="skills"]');
  const prompt = skills.find('li').at(2);

  const icon = prompt.find('FontAwesomeIcon');

  t.is(icon.length, 1);
});

test('the plus icon, when clicked, dipatches a request to set the accepted value', t => {
  const props = {
    skills: ['a', 'b']
  };
  const wrapper = render(props);
  const skills = wrapper.find('[data-type="skills"]');
  const prompt = skills.find('li').at(2);
  const icon = prompt.find('FontAwesomeIcon');

  icon.simulate('click');

  t.true(dispatch.calledWith({
    type: 'SET_PLAYER_INFO',
    payload: {
      hasAcceptedThirdSkill: true
    }
  }));
});

test('when the third skill is accepted, a third textbox is rendered instead of the prompt', t => {
  const props = {
    skills: ['a', 'b'],
    hasAccepted: true
  };
  const wrapper = render(props);
  const skills = wrapper.find('[data-type="skills"]');
  const lastLi = skills.find('li').at(2);

  const textbox = lastLi.find('input');
  const icon = lastLi.find('FontAwesomeIcon');

  t.is(textbox.length, 1);
  t.is(icon.length, 0);
});
