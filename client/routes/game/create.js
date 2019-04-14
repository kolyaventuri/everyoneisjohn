// @flow

import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

import socket from '../../socket';

import type {GameStateType} from '../../apps/game';

type Props = {
  gameId?: string,
  isGm?: boolean
};

type State = {|
  waiting: boolean
|};

class CreateGame extends React.Component<Props, State> {
  static defaultProps = {
    gameId: null,
    isGm: null
  };

  constructor(...args) {
    super(...args);
    this.state = {waiting: true};

    this.createGame();
  }

  static getDerivedStateFromProps(props) {
    const {isGm, gameId} = props;

    if (isGm !== null || gameId !== null) {
      return {
        waiting: false
      };
    }

    return null;
  }

  createGame = () => {
    socket.emit('createGame');
  };

  render() {
    const {isGm, gameId} = this.props;
    const {waiting} = this.state;

    if (waiting) {
      return <p>Loading...</p>;
    }

    if (gameId) {
      if (isGm) {
        return null;
      }
    }

    return <p>Something went wrong...</p>;
  }
}

const mapStateToProps = (state: GameStateType) => {
  const {isGm, gameId} = state.game;

  return {
    isGm,
    gameId
  };
};

export default withRouter(connect(mapStateToProps)(CreateGame));
