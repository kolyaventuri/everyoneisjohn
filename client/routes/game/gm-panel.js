// @flow

import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import socket from '../../socket';
import Player from '../../components/gm/player';
import type {GameStateType, PlayerStateType} from '../../apps/game';

import GameControls from '../../components/gm/game-controls';

type Props = {
  gameId: string,
  players: Array<PlayerStateType>,
  match: {
    params: {
      id: string
    }
  }
};

class GMPanel extends React.Component<Props> {
  constructor(...args: any) {
    super(...args);

    this.joinGm();
  }

  joinGm = () => {
    const {
      match: {
        params: {id: gameId}
      }
    } = this.props;

    socket.emit('joinGm', gameId);
  };

  render() {
    const {gameId, players} = this.props;

    return (
      <div>
        <p>GM: {gameId}</p>
        <GameControls/>
        <ul>
          {players.map(p => {
            return (
              <Player key={p.id} id={p.id}/>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({game}: GameStateType) => {
  const {
    gameId,
    players
  } = game;

  return {
    gameId,
    players: players || []
  };
};

export default withRouter(connect(mapStateToProps)(GMPanel));
