// @flow

import React from 'react';
import {Link} from 'react-router-dom';

import SoundControl from './sound-control';
import styles from './header.scss';

type Props = {|
  inGame?: boolean
|};

const Header = ({inGame}: Props) => (
  <div className={styles.header}>
    <p>
      <Link
        to="/"
      >
        Everyone is John
      </Link>
    </p>
    {
      inGame ?
        (
          <span className={styles.soundControl}>
            <SoundControl/>
          </span>
        ) :
        null
    }
  </div>
);

Header.defaultProps = {
  inGame: true
};

export default Header;
