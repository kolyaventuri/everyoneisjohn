// @flow

import React from 'react';

import Ticker from '../gm/ticker';

type Props = {|
  max: number
|};

type State = {|
  value: number
|};

export default class Bidding extends React.Component<Props, State> {
  constructor(...args: any) {
    super(...args);
    this.state = {value: 0};
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

  render() {
    const {value} = this.state;

    return (
      <Ticker
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}
