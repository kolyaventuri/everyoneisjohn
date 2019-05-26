// @flow

import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/pro-regular-svg-icons';

type Props = {
  onClick: () => void
};

const Reject = ({onClick}: Props) => (
  <p onClick={onClick}>
    <FontAwesomeIcon icon={faTimes}/>
  </p>
);

export default Reject;
