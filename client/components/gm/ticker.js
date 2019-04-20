// @flow

import React from 'react';

type Props = {|
  value: number,
  onChange: (val: number) => void
|};

class Ticker extends React.Component<Props> {
  handleIncrement = () => this.props.onChange(1)

  handleDecrement = () => this.props.onChange(-1)

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

export default Ticker;
