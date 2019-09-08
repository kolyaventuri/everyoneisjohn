// @flow

import React from 'react';
import cx from 'classnames';

import sfxManager from '../../lib/sfx';
import SFX from '../../classes/sfx';
import {ALERT} from '../../constants/effects';
import socket from '../../socket';
import Ticker from '../gm/ticker';
import globalStyles from '../../sass/global.scss';
import styles from './section.scss';

type Props = {|
  max: number
|};

type State = {|
  value: number,
  submitted: boolean
|};

export default class Bidding extends React.Component<Props, State> {
  _alertEffect: ?SFX;

  constructor(...args: any) {
    super(...args);
    this.state = {
      value: 0,
      submitted: false
    };

    this._alertEffect = sfxManager.get(ALERT);
  }

  componentDidMount() {
    const {_alertEffect} = this;

    if (_alertEffect) {
      _alertEffect.play();
    }
  }

  handleChange = (amount: number) => {
    const {max} = this.props;
    const {value} = this.state;
    const nextValue = value + amount;

    if (nextValue >= 0 && nextValue <= max) {
      this.setState({
        value: nextValue
      });
    }
  }

  submitBid = () => {
    const {value: amount} = this.state;

    socket.emit('submitBid', {amount});
    this.setState({submitted: true});
  }

  render() {
    const {value, submitted} = this.state;

    return submitted ?
      null :
      (
        <div className={cx(globalStyles.inline, styles.section)}>
          <p className={styles.title}>Your Bid:</p>
          <Ticker
            value={value}
            onChange={this.handleChange}
          />
          <button
            type="button"
            className={cx(globalStyles.btn, styles.button)}
            onClick={this.submitBid}
          >
            Submit Bid
          </button>
        </div>
      );
  }
}
