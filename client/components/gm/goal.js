// @flow

import React from 'react';

type Props = {|
  name: string,
  value: number
|};

const Goal = ({name, value}: Props) => (
  <div>
    <p data-type="name">{name}</p>
    <p data-type="value">{value}</p>
  </div>
);

export default Goal;
