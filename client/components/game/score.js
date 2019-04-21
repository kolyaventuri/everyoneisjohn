// @flow

import React from 'react';

import styles from './score.scss';

type Props = {|
  value: number
|};

const Score = ({value}: Props) => (
  <div className={styles.score}>
    <p className={styles.title}>Your score is</p>
    <p className={styles.value} data-type="score">{value}.</p>
  </div>
);

export default Score;
