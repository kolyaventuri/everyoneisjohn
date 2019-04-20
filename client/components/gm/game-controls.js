// @flow

import React from 'react';
import {connect} from 'react-redux';

import socket from '../../socket';

import type {GameStateType} from '../../apps/game';

type Props = {|
  mode: 'SETUP' | 'VOTING' | 'PLAYING'
|};

const emit = (event: string) => socket.emit(event);

const renderSetupButtons = () => (
  <button
    type="button"
    onClick={() => emit('startGame')}
  >
    Start Game
  </button>
);

const renderVotingButtons = () => (
  <button
    type="button"
    onClick={() => emit('startPlaying')}
  >
    Skip Bidding
  </button>
);

const renderPlayingButtons = () => (
  <button
    type="button"
    onClick={() => emit('startBidding')}
  >
    Next Round
  </button>
);

const GameControls = ({mode}: Props) => {
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

const mapStateToProps = ({game: {mode}}: GameStateType) => ({mode});

export default connect(mapStateToProps)(GameControls);
