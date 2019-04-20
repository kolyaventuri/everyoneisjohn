// @flow

import React from 'react';

import Dropdown from '../dropdown';

type Props = {|
  name: string,
  value: number,
  onChange: (value: string | number) => void,
  onComplete: () => void
|};

const options = [1, 2, 3];

const Goal = ({name, value, onChange, onComplete}: Props) => (
  <div>
    Goal:
    <p data-type="name">{name}</p>
    <Dropdown
      options={options}
      selected={value}
      onChange={onChange}
    />
    <button
      type="button"
      onClick={onComplete}
    >
      Complete Goal
    </button>
  </div>
);

export default Goal;
