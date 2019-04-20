// @flow

import React from 'react';

import socket from '../../socket';

type Props = {|
  playerId: string,
  value: number
|};

class Willpower extends React.Component<Props> {
  giveWillpower = (amount: number) => {
    const {
      playerId: player
    } = this.props;

    socket.emit('giveWillpower', {
      player,
      amount
    });
  }

  handleIncrement = () => this.giveWillpower(1)

  handleDecrement = () => this.giveWillpower(-1)

  render() {
    const {value} = this.props;
    return (
      <div>
        <button
          type="button"
          data-action="decrement"
          onClick={this.handleDecrement}
        >
          -
        </button>
        <p data-type="value">{value}</p>
        <button
          type="button"
          data-action="increment"
          onClick={this.handleIncrement}
        >
          +
        </button>
      </div>
    );
  }
}

export default Willpower;
