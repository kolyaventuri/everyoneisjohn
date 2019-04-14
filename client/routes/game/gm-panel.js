// @flow

import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import type {GameStateType} from '../../apps/game';

type Props = {
  gameId: string
};

const GMPanel = (props: Props) => {
  return (
    <p>GM: {props.gameId}</p>
  );
};

const mapStateToProps = ({game: {gameId}}: GameStateType) => ({
  gameId
});

export default withRouter(connect(mapStateToProps)(GMPanel));
