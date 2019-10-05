// @flow

import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import type {ApplicationStateType, ConnectionStatus} from '../reducers/types';
import {FAILING} from '../constants/connection-status';
import Spinner from './spinner';
import SoundControl from './sound-control';
import styles from './header.scss';

type Props = {|
  inGame?: boolean,
  connectionStatus: ConnectionStatus
|};

class Header extends React.Component<Props> {
  static defaultProps = {
    inGame: true
  };

  render() {
    const {inGame, connectionStatus} = this.props;
    const shouldRenderSpinner = connectionStatus === FAILING;

    return (
      <div className={styles.header}>
        <p>
          <Link
            to="/"
          >
            Everyone is John
          </Link>
          {shouldRenderSpinner && <Spinner/>}
        </p>
        {
          inGame ?
            (
              <span className={styles.soundControl}>
                <SoundControl/>
              </span>
            ) :
            null
        }
      </div>
    );
  }
}

const mapStateToProps = ({app}: ApplicationStateType) => {
  const {
    connection: {
      status: connectionStatus
    }
  } = app;

  return {
    connectionStatus
  };
};

export default connect(mapStateToProps)(Header);
