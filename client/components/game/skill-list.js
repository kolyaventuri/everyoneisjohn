// @flow

import React from 'react';
import cx from 'classnames';
import uuid from 'uuid/v4';

import globalStyles from '../../sass/global.scss';
import socket from '../../socket';

import styles from './section.scss';

type Props = {|
  frozen: boolean,
  items: Array<string>
|};

type State = {|
  items: Array<string>,
  ids: Array<string>
|};

export default class SkillList extends React.Component<Props, State> {
  constructor(...args: any) {
    super(...args);

    const {items} = this.props;
    const ids = [];

    for (let i = 0; i < items.length; i++) {
      ids[i] = uuid();
    }

    this.state = {items, ids};
  }

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>, index: number) => {
    const {target: {value}} = e;

    const {items} = this.state;
    items[index] = value;

    this.setState({items});
  }

  handleSubmit = (index: number) => {
    const {items} = this.state;
    const content = items[index].trim();

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
          defaultValue={skill}
          placeholder="Enter a skill"
          onChange={e => this.handleChange(e, index)}
        />
        <button
          type="button"
          className={cx(globalStyles.btn, styles.button)}
          onClick={() => this.handleSubmit(index)}
        >
          Submit
        </button>
      </div>
    );
  }

  render() {
    const {items, ids} = this.state;

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
