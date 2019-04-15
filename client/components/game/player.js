// @flow

import React from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid/v4';

import type {PlayerStateType, GameStateType} from '../../apps/game';
import Willpower from './willpower';

type Props = {|
  data: PlayerStateType
|};

type OwnProps = {|
  id: string
|};

const Player = ({data: player}: Props) => {
  const {
    id,
    name,
    willpower,
    goal,
    goalLevel,
    skills,
    points: score
  } = player;

  return (
    <div>
      <h1 data-type="name">{name}</h1>
      <Willpower playerId={id} value={willpower}/>
      <h3 data-type="goal">{goal}</h3>
      <h4 data-type="goalLevel">{goalLevel}</h4>
      <h3 data-type="score">{score}</h3>
      <ul data-type="skills">
        {skills.map(skill => (
          <li key={uuid()}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({game: {players}}: GameStateType, {id}: OwnProps) => {
  const data = players.find(p => p.id === id);

  return {
    data
  };
};

export default connect(mapStateToProps)(Player);
