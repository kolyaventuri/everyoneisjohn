// @flow

import React from 'react';

import type {MatchType} from './types';

type Props = {
  match: MatchType
};

const GMPanel = ({match: {params: {id}}}: Props) => {
  return (
    <p>GM: {id}</p>
  );
};

export default GMPanel;
