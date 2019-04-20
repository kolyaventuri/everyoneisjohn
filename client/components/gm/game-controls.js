// @flow

import React from 'react';
import {connect} from 'react-redux';

import type {GameStateType} from '../../apps/game';

type Props = {|
  mode: 'SETUP' | 'PLAYING' | 'VOTING'
|};

const renderSetupButtons = () => (
  <button type="button">
    Start Game
  </button>
);

const renderVotingButtons = () => (
  <button type="button">
    Skip Bidding
  </button>
);

const renderPlayingButtons = () => (
  <button type="button">
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
