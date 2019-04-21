// @flow

import React from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';

import socket from '../../socket';
import globalStyles from '../../sass/global.scss';
import type {GameStateType} from '../../apps/game';
import styles from './game-controls.scss';

type Props = {|
  mode: 'SETUP' | 'VOTING' | 'PLAYING'
|};

const emit = (event: string) => socket.emit(event);

const renderSetupButtons = () => (
  <button
    type="button"
    className={cx(globalStyles.btn, styles.button)}
    onClick={() => emit('startGame')}
  >
    Start Game
  </button>
);

const renderVotingButtons = () => (
  <button
    type="button"
    className={cx(globalStyles.btn, styles.button)}
    onClick={() => emit('startPlaying')}
  >
    Skip Bidding
  </button>
);

const renderPlayingButtons = () => (
  <button
    type="button"
    className={cx(globalStyles.btn, styles.button)}
    onClick={() => emit('startBidding')}
  >
    Next Round
  </button>
);

const renderButton = (mode: string) => {
  switch (mode) {
    case 'SETUP':
      return renderSetupButtons();
    case 'VOTING':
      return renderVotingButtons();
    case 'PLAYING':
      return renderPlayingButtons();
    default:
      return null; // This should never happen
  }
};

const modeMap = {
  SETUP: 'Setting Up',
  VOTING: 'Bidding',
  PLAYING: 'Playing'
};

const renderStatus = (mode: string) => {
  const modeStr = modeMap[mode];

  return (
    <p className={styles.status}>
      Currently: <span>{modeStr}</span>
    </p>
  );
};

const GameControls = ({mode}: Props) => (
  <div className={styles.container}>
    {renderStatus(mode)}
    {renderButton(mode)}
  </div>
);

const mapStateToProps = ({game: {mode}}: GameStateType) => ({mode});

export default connect(mapStateToProps)(GameControls);
