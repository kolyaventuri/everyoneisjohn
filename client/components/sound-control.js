// @flow

import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faVolume, faVolumeMute} from '@fortawesome/free-regular-svg-icons';
import {connect} from 'react-redux';

import {store} from '../store';
import {SOUND, ON, OFF} from '../constants/settings';
import {set} from '../utils/local-storage';
import type {GameStateType} from '../apps/game';
import styles from './sound-control.scss';

type Props = {|
  soundOn: boolean
|};

const setSound = (sound: boolean) => {
  set(SOUND, sound ? ON : OFF);

  store.dispatch({
    type: 'SET_SOUND',
    payload: {sound}
  });
};

const SoundControl = ({soundOn}: Props) => {
  const icon = soundOn ? faVolume : faVolumeMute;
  const onClick = () => setSound(!soundOn);

  return (
    <FontAwesomeIcon
      className={styles.soundControl}
      icon={icon}
      onClick={onClick}
    />
  );
};

const mapStateToProps = ({app}: GameStateType) => {
  return {
    soundOn: app.sound
  };
};

export default connect(mapStateToProps)(SoundControl);
