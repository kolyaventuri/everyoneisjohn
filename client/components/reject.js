// @flow

import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import styles from './reject.scss';

type Props = {
  onClick: () => void
};

const Reject = ({onClick}: Props) => (
  <p
    className={styles.button}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faTimes}/>
  </p>
);

export default Reject;
