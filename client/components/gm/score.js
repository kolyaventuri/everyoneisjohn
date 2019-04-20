// @flow

import React from 'react';

type Props = {|
  value: number
|};

const Score = ({value}: Props) => (
  <div>
    <h3>
      Score: <span data-type="score">{value}</span>
    </h3>
  </div>
);

export default Score;
