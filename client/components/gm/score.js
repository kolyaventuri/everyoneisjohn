// @flow

import React from 'react';
import Ticker from './ticker';

type Props = {|
  value: number,
  onChange: (amount: number) => void
|};

class Score extends React.Component<Props> {
  handleIncrement = () => this.props.onChange(1)

  handleDecrement = () => this.props.onChange(-1)

  render() {
    const {value, onChange} = this.props;

    return (
      <div>
        <h3>
          Score:
        </h3>
        <Ticker
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default Score;
