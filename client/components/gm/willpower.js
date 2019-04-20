// @flow

import React from 'react';
import Ticker from './ticker';

type Props = {|
  value: number,
  onChange: (val: number) => void
|};

const Willpower = ({value, onChange}: Props) => (
  <Ticker
    value={value}
    onChange={onChange}
  />
);

export default Willpower;
