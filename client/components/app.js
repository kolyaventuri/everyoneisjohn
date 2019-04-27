// @flow

import React from 'react';
import {connect} from 'react-redux';

import type {AppStateType, ErrorType} from '../reducers/types';

import Main from './main';
import Error from './error';

type Props = {
  error: ?ErrorType
};

class App extends React.Component<Props> {
  render() {
    const {error} = this.props;

    if (error) {
      return <Error type={error.type} error={error.error}/>;
    }

    return (
      <div>
        <Main/>
      </div>
    );
  }
}

const mapStateToProps = ({app: {error}}: AppStateType) => ({error});

export default connect(mapStateToProps)(App);
