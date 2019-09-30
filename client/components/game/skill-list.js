// @flow

import React from 'react';
import uuid from 'uuid/v4';
import debounce from 'debounce';
import {addedDiff, updatedDiff, deletedDiff} from 'deep-object-diff';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/pro-regular-svg-icons';

import {DEBOUNCE_AMOUNT} from '../../constants/sockets';

import globalStyles from '../../sass/global.scss';
import socket from '../../socket';
import {store} from '../../store';

import styles from './section.scss';

type Props = {|
  frozen: boolean,
  skills: Array<string>,
  hasAccepted: boolean
|};

type State = {|
  ids: Array<string>,
  skills: Array<string>
|};

const allZero = (objects: Array<{}>): boolean => {
  const vals = objects.map(obj => Object.keys(obj).length);

  return vals.every(val => val === 0);
};

export default class SkillList extends React.Component<Props, State> {
  constructor(...args: any) {
    super(...args);

    const ids = [];

    for (let i = 0; i < 3; i++) {
      ids[i] = uuid();
    }

    const {skills} = this.props;
    this.state = {
      ids,
      skills: skills || []
    };

    this.changeHandler = new Array(3).fill(0).map((_, i) => {
      return debounce(this.handleChange.bind(this, i), DEBOUNCE_AMOUNT);
    });

    if (skills.length === 3) {
      this.setAccepted();
    }
  }

  componentDidUpdate(prevProps: Props): void {
    const newProps = {...this.props};
    const {skills: curSkills, ids} = this.state;
    for (let i = 0; i < 3; i++) {
      const id = ids[i];

      // Iterate over every incoming skill, and ignore updates to skills
      // the player is editing
      const elem = document.querySelector(`input[data-aid='${id}']`);
      if (newProps.skills[i] !== curSkills[i] && document.hasFocus(elem)) {
        newProps.skills[i] = curSkills[i];
      }
    }

    const diff = updatedDiff(prevProps, newProps);
    const addDiff = addedDiff(prevProps, newProps);
    const subDiff = deletedDiff(prevProps, newProps);

    if (allZero([diff, addDiff, subDiff])) {
      // Props have not changed, ignore
      return;
    }

    const {skills} = this.props;
    if (skills.length === 3) {
      this.setAccepted();
    }

    /*
       (6/6/19) Disabling the rule here, since the skill rejection is a fairly specific case
       and we actually do need the state updated to properly reflect the data to the user, due
       to the input value being changed by a socket event / redux action.

       I intend to revisit this in a future bug, and address this properly.
     */
    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({skills});
  }

  handleInput = (e: SyntheticInputEvent<HTMLInputElement>, index: number) => {
    e.persist();

    const {
      target: {
        value
      }
    } = e;

    const hasContent = Boolean(value.trim());

    const {skills} = this.state;

    if (hasContent) {
      skills[index] = value;
    } else {
      skills.splice(index, 1);
    }

    this.setState({
      skills
    });

    this.changeHandler[index](hasContent ? value : '');
  }

  handleChange = (index: number, value: string) => {
    const content = value.trim();

    socket.emit('updateStats', {
      skill: {
        number: index + 1,
        content
      }
    });
  }

  renderSkill = (skill: string, index: number) => {
    const {frozen} = this.props;
    const {ids} = this.state;

    if (frozen) {
      return <span>{skill}</span>;
    }

    return (
      <div>
        <input
          key={`skill-input-${ids[index]}`}
          data-index={ids[index]}
          type="text"
          className={globalStyles.input}
          value={skill}
          placeholder="Enter a skill"
          onInput={e => this.handleInput(e, index)}
          onChange={() => {}}
        />
      </div>
    );
  }

  setAccepted = () => {
    store.dispatch({
      type: 'SET_PLAYER_INFO',
      payload: {
        hasAcceptedThirdSkill: true
      }
    });
  };

  renderOptional = () => {
    const {hasAccepted} = this.props;
    const {skills} = this.state;

    if (skills.length === 2 && !hasAccepted) {
      return (
        <li>
          <div className={styles.question}>
            <span>Add a 3rd skill for 3 willpower?</span>
            <FontAwesomeIcon
              icon={faPlus}
              className={styles.icon}
              onClick={this.setAccepted}
            />
          </div>
        </li>
      );
    }

    return null;
  };

  render() {
    const {hasAccepted} = this.props;
    const {
      ids,
      skills
    } = this.state;

    // Prevent JavaScript object references from messing things up
    const renderedSkills = [...skills];
    const max = hasAccepted ? 3 : 2;
    if (renderedSkills.length < max) {
      // Force at least 1 blank skill box to render up to 3
      renderedSkills.push('');
    }

    return (
      <div className={styles.section}>
        <p className={styles.title}>You have a particular set of skills:</p>
        <ul data-type="skills">
          {renderedSkills.map((skill, index) => (
            <li key={`skill-index-${ids[index]}`}>
              {this.renderSkill(skill, index)}
            </li>
          ))}
          {this.renderOptional()}
        </ul>
      </div>
    );
  }
}
