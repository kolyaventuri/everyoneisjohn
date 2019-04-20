// @flow

import React from 'react';
import {connect} from 'react-redux';

import type {PlayerStateType, GameStateType} from '../../apps/game';

import socket from '../../socket';
import Willpower from './willpower';
import Goal from './goal';
import SkillList from './skill-list';
import Score from './score';

type Props = {|
  data: PlayerStateType
|};

type OwnProps = {|
  id: string
|};

class Player extends React.Component<Props> {
  handleGoalChange = (amount: number | string) => {
    if (typeof amount === 'string') {
      amount = Number.parseInt(amount, 10);
    }

    const player = this.playerId();

    socket.emit('setGoalLevel', {amount, player});
  }

  handleWillpowerChange = (amount: number) => {
    const player = this.playerId();

    socket.emit('giveWillpower', {amount, player});
  }

  handleScoreChange = (amount: number) => {
    const player = this.playerId();

    socket.emit('givePoints', {amount, player});
  }

  playerId() {
    const {
      data: {id}
    } = this.props;

    return id;
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
          onComplete={() => this.handleScoreChange(goalLevel)}
        />
        <Score
          value={score}
          onChange={this.handleScoreChange}
        />
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
