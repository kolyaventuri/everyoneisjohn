// @flow

import React from 'react';
import socket from '../../socket';

type Props = {|
  value: string,
  frozen: boolean
|};

type State = {|
  value: string
|};

export class Goal extends React.Component<Props, State> {
  constructor(...args: any) {
    super(...args);

    const {value} = this.props;
    this.state = {value};
  }

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {target: {value}} = e;

    this.setState({value});
  }

  submitGoal = () => {
    const {value: goal} = this.state;
    socket.emit('updateStats', {goal});
  }

  renderGoal = () => {
    const {frozen} = this.props;
    const {value} = this.state;

    if (frozen) {
      return <span data-type="goal">{value}</span>;
    }

    return (
      <input
        type="text"
        defaultValue={value}
        onChange={this.handleChange}
      />
    );
  }

  renderSubmit = () => {
    return (
      <button
        type="button"
        onClick={this.submitGoal}
      >
        Submit Goal
      </button>
    );
  }

  render() {
    return (
      <div>
        <h3>Goal:</h3>
        {this.renderGoal()}
        {this.renderSubmit()}
      </div>
    );
  }
}

export default Goal;
