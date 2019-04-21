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

const createButton = (event: string, text: string) => (
  <button
    type="button"
    className={cx(globalStyles.btn, styles.button)}
    onClick={() => emit(event)}
  >
    {text}
  </button>
);

const renderSetupButtons = () => createButton('startGame', 'Start Game');

const renderVotingButtons = () => createButton('startPlaying', 'Skip Bidding');

const renderPlayingButtons = () => createButton('startBidding', 'Next Round');

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
