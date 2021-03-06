// @flow

import React from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';

import type {PlayerStateType, GameStateType} from '../../apps/game';

import socket from '../../socket';
import Willpower from './willpower';
import Goal from './goal';
import SkillList from './skill-list';
import Score from './score';
import Kick from './kick';
import styles from './player.scss';

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
      id: playerId,
      name,
      willpower,
      goal,
      goalLevel,
      skills,
      winner,
      points: score
    } = this.props.data;

    return (
      <div className={styles.player}>
        <Kick player={playerId} className={styles.kick}/>
        <span className={styles.container}>
          <h1
            data-type="name"
            className={cx(styles.name, {[styles.winner]: winner})}
          >
            {name}
          </h1>
          <Willpower
            value={willpower}
            onChange={this.handleWillpowerChange}
          />
          <Score
            value={score}
            onChange={this.handleScoreChange}
          />
          <Goal
            player={playerId}
            name={goal}
            value={goalLevel}
            onChange={this.handleGoalChange}
            onComplete={() => this.handleScoreChange(goalLevel)}
          />
          <SkillList player={playerId}>{skills}</SkillList>
        </span>
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
