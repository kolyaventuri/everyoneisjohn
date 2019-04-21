// @flow

import React from 'react';

import PlayerInfo from './player-info';
import styles from './panel.scss';

const GamePanel = () => (
  <div className={styles.container}>
    <PlayerInfo/>
  </div>
);

export default GamePanel;
