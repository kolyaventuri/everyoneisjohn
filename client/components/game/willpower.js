// @flow

import React from 'react';

import styles from './willpower.scss';

type Props = {|
  value: number
|};

const Willpower = ({value}: Props) => (
  <div className={styles.willpower}>
    <p className={styles.title}>You have</p>
    <p className={styles.value} data-type="willpower">{value}</p>
    <p className={styles.title}>willpower.</p>
  </div>
);

export default Willpower;
