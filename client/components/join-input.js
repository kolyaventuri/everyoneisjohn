// @flow

import React from 'react';
import {push} from 'connected-react-router';

import {store} from '../store';

type State = {|
  gameId: string
|};

export default class GameJoinInput extends React.Component<{}, State> {
  constructor(...args) {
    super(...args);
    this.state = {gameId: ''};
  }

  handleChange = (e: SyntheticKeyboardEvent<*>) => {
    const {target} = e;
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
      <form>
        <input type="text" onKeyUp={this.handleChange}/>
        <button type="button" onClick={this.handleJoin}>Join Game</button>
      </form>
    );
  }
}
