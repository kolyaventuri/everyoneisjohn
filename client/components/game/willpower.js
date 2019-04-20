// @flow

import React from 'react';

type Props = {|
  value: number
|};

const Willpower = ({value}: Props) => (
  <div>
    <h3>Willpower:</h3>
    <span data-type="willpower">{value}</span>
  </div>
);

export default Willpower;
