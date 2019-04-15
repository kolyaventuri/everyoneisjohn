// @flow

import React from 'react';
import uuid from 'uuid/v4';

import type {PlayerStateType} from '../../apps/game';

type Props = {|
  data: PlayerStateType
|};

const Player = ({data: player}: Props) => {
  const {
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
      <h3 data-type="willpower">{willpower}</h3>
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

export default Player;
