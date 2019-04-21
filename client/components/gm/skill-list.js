// @flow

import React from 'react';
import uuid from 'uuid/v4';

import styles from './skill-list.scss';

type Props = {|
  children: Array<string>
|};

const hasContent = arr => arr.filter(item => Boolean(item)).length > 0;

const SkillList = ({children}: Props) => hasContent(children) ? (
  <div className={styles.skills}>
    <p className={styles.title}>Skills</p>
    <ul className={styles.list}>
      {children.map(skill => skill ? (
        <li key={uuid()}>{skill}</li>
      ) : null)}
    </ul>
  </div>
) : null;

export default SkillList;
