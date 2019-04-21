// @flow

import React from 'react';

type Props = {|
  value: string
|};

const Name = ({value}: Props) => (
  <div>
    <p>You are</p>
    <p data-type="name">{value}</p>
  </div>
);

export default Name;
