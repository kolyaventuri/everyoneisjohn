// @flow

import React from 'react';
import {Link} from 'react-router-dom';

import SoundControl from './sound-control';
import styles from './header.scss';

const Header = () => (
  <div className={styles.header}>
    <p>
      <Link
        to="/"
      >
        Everyone is John
      </Link>
    </p>
    <span className={styles.soundControl}>
      <SoundControl/>
    </span>
  </div>
);

export default Header;
