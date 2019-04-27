// @flow

import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import type {ApplicationStateType, ErrorType} from '../reducers/types';

import Main from './main';
import Error from './error';

type Props = {
  error: ?ErrorType,
  gameId: ?string,
  isGm: boolean
};

class App extends React.Component<Props> {
  render() {
    const {error, gameId, isGm} = this.props;

    if (error) {
      return <Error error={error.error} gameId={gameId} isGm={isGm}/>;
    }

    return (
      <div>
        <Main/>
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationStateType) => {
  const {
    app: {
      error
    },
    game: {
      gameId,
      isGm
    }
  } = state;

  return {
    error,
    gameId,
    isGm: Boolean(isGm)
  };
};

export default withRouter(connect(mapStateToProps)(App));
