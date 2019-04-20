// @flow

import React from 'react';
import {connect} from 'react-redux';

import type {PlayerStateType, GameStateType} from '../../apps/game';

import socket from '../../socket';
import Willpower from './willpower';
import Goal from './goal';
import SkillList from './skill-list';

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

  handleWillpowerChange = (amount: number) => {
    const {
      data: {id: player}
    } = this.props;

    socket.emit('giveWillpower', {amount, player});
  }

  render() {
    const {
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
        <Willpower
          value={willpower}
          onChange={this.handleWillpowerChange}
        />
        <Goal
          name={goal}
          value={goalLevel}
          onChange={this.handleGoalChange}
        />
        <h3 data-type="score">{score}</h3>
        <SkillList>{skills}</SkillList>
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
