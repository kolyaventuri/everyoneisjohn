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
  skills: Array<string>,
  goal: string,
  points: number,
  frozen: boolean,
  mode: GameModeType,
  winner: boolean,
  hasAcceptedThirdSkill: boolean
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
      skills,
      points: score,
      frozen,
      winner,
      hasAcceptedThirdSkill
    } = this.props;

    return (
      <div className={styles.player}>
        <Name value={name}/>
        {winner && <p className={styles.winner}>You are in control.</p>}
        <Willpower value={willpower}/>
        {this.renderBidding()}
        <Score value={score}/>
        <Goal value={goal} frozen={frozen}/>
        <SkillList frozen={frozen} skills={skills} hasAccepted={Boolean(hasAcceptedThirdSkill)}/>
      </div>
    );
  }
}

const mapStateToProps = ({player, game}: GameStateType) => {
  const {
    name,
    willpower,
    skills,
    goal,
    points,
    frozen,
    winner,
    hasAcceptedThirdSkill
  } = player;

  const {mode} = game;

  return {
    name,
    willpower,
    skills,
    goal,
    points,
    frozen,
    mode,
    winner,
    hasAcceptedThirdSkill
  };
};

export default connect(mapStateToProps)(PlayerInfo);
