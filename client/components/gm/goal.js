// @flow

import React from 'react';
import cx from 'classnames';

import Reject from '../reject';
import Dropdown from '../dropdown';
import socket from '../../socket';
import globalStyles from '../../sass/global.scss';
import styles from './goal.scss';

type Props = {|
  player: string,
  name: string,
  value: number,
  onChange: (value: string | number) => void,
  onComplete: () => void
|};

const options = [1, 2, 3];

const reject = player => socket.emit('rejectGoal', {player});

const Goal = ({player, name, value, onChange, onComplete}: Props) => name ? (
  <div className={styles.goal}>
    <div className={styles.container}>
      <p className={styles.title}>Obsession:&nbsp;</p>
      <p data-type="name">{name}</p>
      <Reject onClick={() => reject(player)}/>
    </div>
    <div className={styles.container}>
      <p className={styles.title}>Value:&nbsp;</p>
      <Dropdown
        options={options}
        selected={value}
        onChange={onChange}
      />
    </div>
    <div className={cx(styles.container, styles.complete)}>
      <button
        type="button"
        className={cx(globalStyles.btn, styles.button)}
        onClick={onComplete}
      >
        Complete Obsession
      </button>
    </div>
  </div>
) : null;

export default Goal;
