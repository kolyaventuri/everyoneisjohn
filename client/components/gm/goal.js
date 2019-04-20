// @flow

import React from 'react';

import Dropdown from '../dropdown';

type Props = {|
  name: string,
  value: number
|};

const options = [1, 2, 3];

const Goal = ({name, value}: Props) => (
  <div>
    Goal:
    <p data-type="name">{name}</p>
    <Dropdown
      options={options}
      selected={value}
    />
  </div>
);

export default Goal;
