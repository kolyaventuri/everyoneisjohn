// @flow

import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-regular-svg-icons';

import styles from './spinner.scss';

const Spinner = () => (
  <FontAwesomeIcon
    className={styles.spinner}
    icon={faSpinner}
  />
);

export default Spinner;
