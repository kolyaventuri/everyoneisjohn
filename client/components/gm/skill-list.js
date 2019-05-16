// @flow

import React from 'react';
import uuid from 'uuid/v4';

import socket from '../../socket';

import styles from './skill-list.scss';

type Props = {|
  children: Array<string>,
  player: string
|};

const hasContent = arr => arr.filter(item => Boolean(item)).length > 0;

class SkillList extends React.Component<Props> {
  handleReject = (index: number) => {
    const {player} = this.props;

    socket.emit('rejectSkill', {index, player});
  }

  render() {
    const {children} = this.props;

    if (hasContent(children)) {
      return (
        <div className={styles.skills}>
          <p className={styles.title}>Skills</p>
          <ul className={styles.list}>
            {children.map((skill, index) => skill ? (
              <li key={uuid()}>
                <p>{skill}</p>
                <p onClick={() => this.handleReject(index)}>X</p>
              </li>
            ) : null)}
          </ul>
        </div>
      );
    }

    return null;
  }
}

export default SkillList;
