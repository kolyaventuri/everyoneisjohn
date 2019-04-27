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
  error: string
};

const resolveError = (error: string): string => {
  const errorParts = error.split('.');
  let current = errorMap;
  for (const part of errorParts) {
    if (typeof current[part] === 'object') {
      current = current[part];
    } else if (typeof current[part] === 'string') {
      return current[part];
    } else {
      return 'An unknown error occurred';
    }
  }
};

const clearError = () => store.dispatch({type: 'CLEAR_ERROR'});

const Error = ({error}: Props) => {
  const errorText = resolveError(error);

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
        <Row className={styles.start}>
          <Col xs={12} lg={2} lgOffset={5}>
            <Link
              to="/"
              className={globalStyles.btn}
              onClick={clearError}
            >
              <span>Return Home</span>
            </Link>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Error;
