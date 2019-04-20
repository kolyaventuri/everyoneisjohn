// @flow

import React from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid/v4';

import type {PlayerStateType, GameStateType} from '../../apps/game';

import socket from '../../socket';
import Willpower from './willpower';
import Goal from './goal';

type Props = {|
  data: PlayerStateType
|};

type OwnProps = {|
  id: string
|};

class Player extends React.Component<Props> {
  handleGoalChange = (amount: number | string) => {
    const {
      data: {id: player}
    } = this.props;

    socket.emit('setGoalLevel', {amount, player});
  }

  render() {
    const {
      id,
      name,
      willpower,
      goal,
      goalLevel,
      skills,
      points: score
    } = this.props.data;

    return (
      <div>
        <h1 data-type="name">{name}</h1>
        <Willpower playerId={id} value={willpower}/>
        <Goal
          name={goal}
          value={goalLevel}
          onChange={this.handleGoalChange}
        />
        <h3 data-type="score">{score}</h3>
        <ul data-type="skills">
          {skills.map(skill => (
            <li key={uuid()}>{skill}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({game: {players}}: GameStateType, {id}: OwnProps) => {
  const data = players.find(p => p.id === id);

  return {
    data
  };
};

export default connect(mapStateToProps)(Player);
