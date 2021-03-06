// @flow

import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Grid, Row, Col} from 'react-flexbox-grid';

import socket from '../../socket';
import Player from '../../components/gm/player';
import type {GameStateType, PlayerStateType} from '../../apps/game';

import Header from '../../components/header';
import GameControls from '../../components/gm/game-controls';
import styles from './gm-panel.scss';

type Props = {
  gameId: string,
  players: Array<PlayerStateType>,
  match: {
    params: {
      id: string
    }
  }
};

let url = process.env.ENV === 'local' ? 'localhost:3000' : '{env}.everyoneisjohn.xyz';
url = url.replace('{env}', process.env.ENV === 'beta' ? 'beta' : 'www');
const getLink = (code: string): string => `${url}/game/${code}`;

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
    const link = getLink(gameId);
    const linkHref = `${window.location.protocol}//${link}`;

    return (
      <div className={styles.container}>
        <Header/>
        <div className={styles.heading}>
          <p className={styles.title}>You are the Game Master.</p>
          <p className={styles.gameId}>
            Code: <span>{gameId}</span>
            <br/>
            <a href={linkHref} target="_blank" rel="noopener noreferrer">{link}</a>
          </p>
        </div>
        <div className={styles.status}>
          <GameControls/>
        </div>
        <Grid fluid>
          <Row>
            {players.map(p => (
              <Col key={`col-${p.id}`} xs={12} md={4} lg={3}>
                <Player key={p.id} id={p.id}/>
              </Col>
            ))}
          </Row>
        </Grid>
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
