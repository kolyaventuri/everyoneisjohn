// @flow

import React from 'react';

const Game = ({match: {params: {id}}})=> {
  return (
    <p>{id}</p>
  );
};

export default Game;
