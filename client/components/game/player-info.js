// @flow

import React from 'react';
import {connect} from 'react-redux';

import type {GameStateType} from '../../apps/game';

type Props = {
  name: string,
  willpower: number,
  skills: Array<string>,
  goal: string,
  points: number
};

class PlayerInfo extends React.Component<Props> {
  render() {
    const {
      name,
      willpower,
      skills,
      goal,
      points
    } = this.props;

    return (
      <div>
        <p>Name: {name}</p>
        <p>Willpower: {willpower}</p>
        <p>Score: {points}</p>
        <p>Goal: {goal}</p>
        <p>Skills: {skills.join(', ')}</p>
      </div>
    );
  }
}

const mapStateToProps = ({player}: GameStateType) => {
  const {
    name,
    willpower,
    skills,
    goal,
    points
  } = player;

  return {
    name,
    willpower,
    skills,
    goal,
    points
  };
};

export default connect(mapStateToProps)(PlayerInfo);
