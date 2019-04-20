// @flow

import React from 'react';

type Props = {|
  value: number
|};

const Score = ({value}: Props) => (
  <div>
    <h3>Score:</h3>
    <span data-type="score">{value}</span>
  </div>
);

export default Score;
