// @flow

import React from 'react';
import {connect} from 'react-redux';

import {modes} from '../../constants/game';
import type {GameStateType, GameModeType} from '../../apps/game';

import Willpower from './willpower';
import Score from './score';
import Goal from './goal';
import SkillList from './skill-list';
import Name from './name';
import Bidding from './bidding';
import styles from './player-info.scss';

type Props = {|
  name: string,
  willpower: number,
  skill1: string,
  skill2: string,
  skill3: string,
  goal: string,
  points: number,
  frozen: boolean,
  mode: GameModeType,
  winner: boolean
|};

class PlayerInfo extends React.Component<Props> {
  renderBidding = () => {
    const {
      willpower,
      mode
    } = this.props;

    if (mode === modes.VOTING) {
      return (
        <Bidding
          max={willpower}
        />
      );
    }

    return null;
  }

  render() {
    const {
      name,
      willpower,
      goal,
      skill1,
      skill2,
      skill3,
      points: score,
      frozen,
      winner
    } = this.props;

    const skills = {skill1, skill2, skill3};

    return (
      <div className={styles.player}>
        <Name value={name}/>
        {winner && <p className={styles.winner}>You are in control.</p>}
        <Willpower value={willpower}/>
        {this.renderBidding()}
        <Score value={score}/>
        <Goal value={goal} frozen={frozen}/>
        <SkillList frozen={frozen} {...skills}/>
      </div>
    );
  }
}

const mapStateToProps = ({player, game}: GameStateType) => {
  const {
    name,
    willpower,
    skill1,
    skill2,
    skill3,
    goal,
    points,
    frozen,
    winner
  } = player;

  const {mode} = game;

  return {
    name,
    willpower,
    skill1,
    skill2,
    skill3,
    goal,
    points,
    frozen,
    mode,
    winner
  };
};

export default connect(mapStateToProps)(PlayerInfo);
