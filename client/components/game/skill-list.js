// @flow

import React from 'react';
import uuid from 'uuid/v4';

type Props = {|
  children: Array<string>
|};

const SkillList = ({children}: Props) => (
  <div>
    <h3>Skills:</h3>
    <ul data-type="skills">
      {children.map(skill => (
        <li key={uuid()}>{skill}</li>
      ))}
    </ul>
  </div>
);

export default SkillList;
