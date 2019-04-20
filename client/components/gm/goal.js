// @flow

import React from 'react';

import Dropdown from '../dropdown';

type Props = {|
  name: string,
  value: number,
  onChange: (value: string | number) => void
|};

const options = [1, 2, 3];

const Goal = ({name, value, onChange}: Props) => (
  <div>
    Goal:
    <p data-type="name">{name}</p>
    <Dropdown
      options={options}
      selected={value}
      onChange={onChange}
    />
  </div>
);

export default Goal;
