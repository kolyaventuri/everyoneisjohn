// @flow

import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Row, Col} from 'react-flexbox-grid';

import errorMap from '../constants/error-map';
import {store} from '../store';

import globalStyles from '../sass/global.scss';
import styles from '../routes/home.scss';
import errorStyles from './error.scss';

type Props = {
  error: string,
  gameId: ?string,
  isGm: boolean
};

const resolveError = (error: string, gameId?: string): string => {
  const res = {};

  const errorParts = error.split('.');
  let current = errorMap;

  for (const part of errorParts) {
    if (typeof current[part] === 'object') {
      current = current[part];
    } else if (typeof current[part] === 'string') {
      res.errorText = current[part];
      break;
    } else {
      res.errorText = 'An unknown error occurred';
      break;
    }
  }

  if (gameId) {
    res.extra = 'If you were already in a game, you can attempt to rejoin it.';
  }

  return res;
};

const clearError = () => store.dispatch({type: 'CLEAR_ERROR'});
const returnToGame = (id: string, isGm: boolean) => {
  let location = `/game/${id}`;
  if (isGm) {
    location += '/gm';
  }

  window.location = location;
};

const Error = ({error, gameId, isGm}: Props) => {
  const {errorText, extra} = resolveError(error, gameId);

  return (
    <div className={styles.container}>
      <Grid fluid className={styles['start-here']}>
        <Row>
          <Col xs={12}>
            <h1 className={styles.title}>Something is wrong...</h1>
            <p className={errorStyles.subtitle}>{errorText}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={8} lgOffset={2}>
            <p className={styles.midway}><span>Sorry about that.</span></p>
          </Col>
        </Row>
        {
          extra &&
          <Row>
            <Col xs={12} lg={8} lgOffset={2}>
              <p className={globalStyles.center}>{extra}</p>
            </Col>
          </Row>
        }
        <Row className={styles.start}>
          <Col xs={12} lg={2} lgOffset={gameId ? 4 : 5}>
            <Link
              to="/"
              className={globalStyles.btn}
              onClick={clearError}
            >
              <span>Return Home</span>
            </Link>
          </Col>
          {
            gameId &&
            <Col xs={12} lg={2}>
              <Link
                to="#"
                className={globalStyles.btn}
                onClick={() => {
                  returnToGame(gameId, isGm);
                }}
              >
                <span>Return to Game</span>
              </Link>
            </Col>
          }
        </Row>
      </Grid>
    </div>
  );
};

export default Error;
