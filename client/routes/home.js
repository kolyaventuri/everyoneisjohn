// @flow

import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Row, Col} from 'react-flexbox-grid';

import JoinInput from '../components/join-input';

import globalStyles from '../sass/global.scss';
import styles from './home.scss';

const Home = () => (
  <div className={styles.container}>
    <Grid fluid className={styles['start-here']}>
      <Row>
        <Col xs={12}>
          <h1 className={styles.title}>Everyone is John</h1>
        </Col>
      </Row>
      <Row className={styles.homeGroup}>
        <Col xs={12} lg={4} lgOffset={4}>
          <JoinInput/>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={8} lgOffset={2}>
          <p className={styles.midway}><span>Or</span></p>
        </Col>
      </Row>
      <Row className={styles.start}>
        <Col xs={12} lg={2} lgOffset={4}>
          <Link
            to="/game/create"
            className={globalStyles.btn}
          >
            <span>Start a Game</span>
          </Link>
        </Col>
        <Col xs={12} lg={2}>
          <Link
            to="/rules"
            className={globalStyles.btn}
          >
            <span>Read the Rules</span>
          </Link>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Home;
