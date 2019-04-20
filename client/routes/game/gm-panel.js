// @flow

import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Player from '../../components/gm/player';
import type {GameStateType, PlayerStateType} from '../../apps/game';

type Props = {
  gameId: string,
  players: Array<PlayerStateType>
};

class GMPanel extends React.Component<Props> {
  render() {
    const {gameId, players} = this.props;

    return (
      <div>
        <p>GM: {gameId}</p>
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
