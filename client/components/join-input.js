// @flow

import React from 'react';
import {push} from 'connected-react-router';
import {Row, Col} from 'react-flexbox-grid';

import {store} from '../store';
import styles from './join-input.scss';

type State = {|
  gameId: string
|};

export default class GameJoinInput extends React.Component<{}, State> {
  constructor(...args: {[string]: any}) {
    super(...args);
    this.state = {gameId: ''};
  }

  handleChange = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const {currentTarget: target} = e;
    const gameId = target.value.trim();

    this.setState({gameId});
  };

  handleJoin = (e: SyntheticMouseEvent<*>) => {
    e.preventDefault();

    const {gameId} = this.state;

    if (gameId) {
      store.dispatch(push(`/game/${gameId}`));
    }
  };

  render() {
    return (
      <Row>
        <Col xs={12} md={9}>
          <input
            type="text"
            placeholder="Enter Game Code"
            className={styles.input}
            onKeyUp={this.handleChange}
          />
        </Col>
        <Col xs={12} md={3}>
          <button
            type="button"
            className={styles.button}
            onClick={this.handleJoin}
          >
            Join Game
          </button>
        </Col>
      </Row>
    );
  }
}
