// @flow

import React from 'react';
import {connect} from 'react-redux';

import type {GameStateType} from '../../apps/game';

import Willpower from './willpower';
import Score from './score';
import Goal from './goal';
import SkillList from './skill-list';

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
      points: score
    } = this.props;

    return (
      <div>
        <p className="name">Name: {name}</p>
        <Willpower value={willpower}/>
        <Score value={score}/>
        <Goal value={goal}/>
        <SkillList>{skills}</SkillList>
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
