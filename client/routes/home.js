// @flow

import React from 'react';
import cx from 'classnames';
import {Link} from 'react-router-dom';

import JoinInput from '../components/join-input';

import globalStyles from '../sass/global.scss';
import styles from './home.scss';

const Home = () => (
  <div className={styles.container}>
    <div className={styles['start-here']}>
      <h1 className={styles.title}>Everyone is John</h1>
      <div className={cx(globalStyles.btnGroup, styles.homeGroup)}>
        <Link
          to="/game/create"
          className={globalStyles.btn}
        >
          <span>Start a Game</span>
        </Link>
        <a
          href="#"
          className={globalStyles.btn}
        >
          <span>Join a Game</span>
        </a>
      </div>
    </div>
  </div>
);

export default Home;
