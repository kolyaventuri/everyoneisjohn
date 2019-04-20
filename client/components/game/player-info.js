// @flow

import React from 'react';
import {connect} from 'react-redux';

import type {GameStateType} from '../../apps/game';

import Willpower from './willpower';
import Score from './score';
import Goal from './goal';
import SkillList from './skill-list';

type Props = {|
  name: string,
  willpower: number,
  skills: Array<string>,
  goal: string,
  points: number,
  frozen: boolean
|};

class PlayerInfo extends React.Component<Props> {
  render() {
    const {
      name,
      willpower,
      skills,
      goal,
      points: score,
      frozen
    } = this.props;

    return (
      <div>
        <p className="name">Name: {name}</p>
        <Willpower value={willpower}/>
        <Score value={score}/>
        <Goal value={goal} frozen={frozen}/>
        <SkillList items={skills} frozen={frozen}/>
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
    points,
    frozen
  } = player;

  return {
    name,
    willpower,
    skills,
    goal,
    points,
    frozen
  };
};

export default connect(mapStateToProps)(PlayerInfo);
