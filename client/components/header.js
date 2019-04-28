// @flow

import React from 'react';
import {Link} from 'react-router-dom';

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
  </div>
);

export default Header;
