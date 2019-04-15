// @flow

import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Player from '../../components/game/player';
import type {GameStateType, PlayerStateType} from '../../apps/game';

type Props = {
  gameId: string,
  players: Array<PlayerStateType>
};

const GMPanel = (props: Props) => {
  return (
    <div>
      <p>GM: {props.gameId}</p>
      <ul>
        {props.players.map(p => {
          return (
            <Player key={p.id} data={p}/>
          );
        })}
      </ul>
    </div>
  );
};

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
