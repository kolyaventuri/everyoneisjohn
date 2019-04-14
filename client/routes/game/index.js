// @flow

import React from 'react';

import type {MatchType} from './types';

type Props = {
  match: MatchType
};

const Game = ({match: {params: {id}}}: Props) => {
  return (
    <p>{id}</p>
  );
};

export default Game;
