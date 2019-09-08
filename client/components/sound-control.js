// @flow

import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faVolume, faVolumeMute} from '@fortawesome/pro-regular-svg-icons';
import {connect} from 'react-redux';

import {ON} from '../constants/settings';
import type {GameStateType} from '../apps/game';

type Props = {|
  soundOn: boolean
|};

const SoundControl = ({soundOn}: Props) => {
  const icon = soundOn ? faVolume : faVolumeMute;

  return <FontAwesomeIcon icon={icon}/>;
};

const mapStateToProps = ({app}: GameStateType) => {
  return {
    soundOn: app.sound === ON
  };
};

export default connect(mapStateToProps)(SoundControl);
