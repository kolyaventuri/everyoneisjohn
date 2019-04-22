// @flow

import React from 'react';

import socket from '../../socket';
import Ticker from '../gm/ticker';

type Props = {|
  max: number
|};

type State = {|
  value: number,
  submitted: boolean
|};

export default class Bidding extends React.Component<Props, State> {
  constructor(...args: any) {
    super(...args);
    this.state = {
      value: 0,
      submitted: false
    };
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
        <div>
          <Ticker
            value={value}
            onChange={this.handleChange}
          />
          <button
            type="button"
            onClick={this.submitBid}
          >
            Submit Bid
          </button>
        </div>
      );
  }
}
