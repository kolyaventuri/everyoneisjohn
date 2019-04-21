// @flow

import React from 'react';
import cx from 'classnames';

import Dropdown from '../dropdown';
import globalStyles from '../../sass/global.scss';
import styles from './goal.scss';

type Props = {|
  name: string,
  value: number,
  onChange: (value: string | number) => void,
  onComplete: () => void
|};

const options = [1, 2, 3];

const Goal = ({name, value, onChange, onComplete}: Props) => name ? (
  <div className={styles.goal}>
    <div className={styles.container}>
      <p className={styles.title}>Obsession:&nbsp;</p>
      <p data-type="name">{name}</p>
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
