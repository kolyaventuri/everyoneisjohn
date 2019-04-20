// @flow

import React from 'react';

type Props = {|
  value: string
|};

const Goal = ({value}: Props) => (
  <div>
    <h3>Goal:</h3>
    <span data-type="goal">{value}</span>
  </div>
);

export default Goal;
