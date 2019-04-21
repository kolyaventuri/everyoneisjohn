// @flow

import React from 'react';
import Ticker from './ticker';

import styles from './willpower.scss';

type Props = {|
  value: number,
  onChange: (val: number) => void
|};

const Willpower = ({value, onChange}: Props) => (
  <Ticker
    className={styles.willpower}
    value={value}
    onChange={onChange}
  />
);

export default Willpower;
