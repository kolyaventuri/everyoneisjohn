// @flow

import React from 'react';

import styles from './name.scss';

type Props = {|
  value: string
|};

const Name = ({value}: Props) => (
  <div className={styles.name}>
    <p>You are</p>
    <p
      className={styles.text}
      data-type="name"
    >
      {value}
    </p>
  </div>
);

export default Name;
