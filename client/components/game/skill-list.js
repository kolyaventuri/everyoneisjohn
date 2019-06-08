// @flow

import React from 'react';
import uuid from 'uuid/v4';
import debounce from 'debounce';
import {updatedDiff} from 'deep-object-diff';

import {DEBOUNCE_AMOUNT} from '../../constants/sockets';

import globalStyles from '../../sass/global.scss';
import socket from '../../socket';

import styles from './section.scss';

type Props = {|
  frozen: boolean,
  skill1: string,
  skill2: string,
  skill3: string
|};

type State = {|
  ids: Array<string>,
  skill1: string,
  skill2: string,
  skill3: string
|};

export default class SkillList extends React.Component<Props, State> {
  constructor(...args: any) {
    super(...args);

    const ids = [];

    for (let i = 0; i < 3; i++) {
      ids[i] = uuid();
    }

    const {skill1, skill2, skill3} = this.props;
    this.state = {
      ids,
      skill1: skill1 || '',
      skill2: skill2 || '',
      skill3: skill3 || ''
    };

    this.changeHandler = new Array(3).fill(0).map((_, i) => {
      return debounce(this.handleChange.bind(this, i), DEBOUNCE_AMOUNT);
    });
  }

  componentDidUpdate(prevProps: Props): void {
    const diff = updatedDiff(prevProps, this.props);
    if (Object.keys(diff).length === 0) {
      // Props have not changed, ignore
      return;
    }

    /*
       (6/6/19) Disabling the rule here, since the skill rejection is a fairly specific case
       and we actually do need the state updated to properly reflect the data to the user, due
       to the input value being changed by a socket event / redux action.

       I intend to revisit this in a future bug, and address this properly.
     */
    // eslint-disable-next-line react/no-did-update-set-state
    this.setState(diff);
  }

  handleInput = (e: SyntheticInputEvent<HTMLInputElement>, index: number) => {
    e.persist();

    const {
      target: {
        value
      }
    } = e;

    this.setState({
      [`skill${index + 1}`]: value
    });

    this.changeHandler[index](value);
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
      <div className={styles.skill}>
        <input
          key={`skill-input-${ids[index]}`}
          type="text"
          className={globalStyles.input}
          value={skill}
          placeholder="Enter a skill"
          onInput={e => this.handleInput(e, index)}
          onChange={e => this.handleInput(e, index)}
        />
      </div>
    );
  }

  render() {
    const {
      ids,
      skill1,
      skill2,
      skill3
    } = this.state;

    const items = [skill1, skill2, skill3];

    return (
      <div className={styles.section}>
        <p className={styles.title}>You have a particular set of skills:</p>
        <ul data-type="skills">
          {items.map((skill, index) => (
            <li key={`skill-index-${ids[index]}`}>
              {this.renderSkill(skill, index)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
