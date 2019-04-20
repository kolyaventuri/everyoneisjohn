// @flow

import React from 'react';
import uuid from 'uuid/v4';

type Props = {|
  children: Array<string>
|};

const SkillList = ({children}: Props) => (
  <ul>
    {children.map(skill => (
      <li key={uuid()}>{skill}</li>
    ))}
  </ul>
);

export default SkillList;
