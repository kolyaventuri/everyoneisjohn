// @flow

import React from 'react';
import {connect} from 'react-redux';

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
  mode: GameModeType
|};

class PlayerInfo extends React.Component<Props> {
  render() {
    const {
      name,
      willpower,
      skills,
      goal,
      points: score,
      frozen,
      mode
    } = this.props;

    return (
      <div className={styles.player}>
        <Name value={name}/>
        <Willpower value={willpower}/>
        {mode === 'VOTING' ? <Bidding/> : null}
        <Score value={score}/>
        <Goal value={goal} frozen={frozen}/>
        <SkillList items={skills} frozen={frozen}/>
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
    frozen
  } = player;

  const {mode} = game;

  return {
    name,
    willpower,
    skills,
    goal,
    points,
    frozen,
    mode
  };
};

export default connect(mapStateToProps)(PlayerInfo);
