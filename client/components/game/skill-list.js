// @flow

import React from 'react';
import uuid from 'uuid/v4';
import debounce from 'debounce';

import {DEBOUNCE_AMOUNT} from '../../constants/sockets';

import globalStyles from '../../sass/global.scss';
import socket from '../../socket';

import styles from './section.scss';

type Props = {|
  frozen: boolean,
  items: Array<string>
|};

type State = {|
  ids: Array<string>,
  items: Array<string>
|};

export default class SkillList extends React.Component<Props, State> {
  constructor(...args: any) {
    super(...args);

    const {items} = this.props;
    const ids = [];

    for (let i = 0; i < items.length; i++) {
      ids[i] = uuid();
    }

    this.state = {
      ids,
      items: this.props.items || new Array(3).fill('')
    };

    this.changeHandler = new Array(3).fill(0).map((_, i) => {
      return debounce(this.handleChange.bind(this, i), DEBOUNCE_AMOUNT);
    });
  }

  handleInput = (e: SyntheticInputEvent<HTMLInputElement>, index: number) => {
    e.persist();

    const {
      target: {
        value
      }
    } = e;

    const {items} = this.state;
    items[index] = value;

    this.setState({items});

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
    const {ids, items} = this.state;

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
