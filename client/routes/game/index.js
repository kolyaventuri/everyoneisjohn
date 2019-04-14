// @flow

import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import socket from '../../socket';

import type {GameStateType} from '../../apps/game';
import type {MatchType} from './types';

type Props = {
  match: MatchType,
  gameId?: string
};

type State = {
  waiting: boolean
}

class Game extends React.Component<Props, State> {
  static defaultProps = {
    gameId: null
  };

  constructor(...args) {
    super(...args);

    this.state = {waiting: true};

    this.joinGame();
  }

  static getDerivedStateFromProps(props) {
    const {gameId} = props;

    if (gameId !== null) {
      return {
        waiting: false
      };
    }

    return null;
  }

  joinGame = () => {
    const {
      match: {
        params: {id: gameId}
      }
    } = this.props;

    socket.emit('joinGame', gameId);
  };

  render() {
    const {gameId} = this.props;
    const {waiting} = this.state;

    if (waiting) {
      return <p>Loading...</p>;
    }

    return <p>{gameId}</p>;
  }
}

const mapStateToProps = (state: GameStateType) => {
  const {gameId} = state.game;

  return {
    gameId
  };
};

export default withRouter(connect(mapStateToProps)(Game));
