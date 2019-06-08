// @flow

import React from 'react';
import debounce from 'debounce';

import socket from '../../socket';
import {DEBOUNCE_AMOUNT} from '../../constants/sockets';

import globalStyles from '../../sass/global.scss';
import styles from './section.scss';

type Props = {|
  value: string,
  frozen: boolean
|};

type State = {|
  value: string
|};

export default class Goal extends React.Component<Props, State> {
  constructor(...args) {
    super(...args);

    this.state = {
      value: this.props.value || ''
    };

    this.submitGoal = debounce(this.submitGoal, DEBOUNCE_AMOUNT);
  }

  handleInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.persist();

    const {
      target: {
        value: goal
      }
    } = e;

    this.setState({value: goal});

    this.submitGoal(goal);
  }

  submitGoal = (goal: string) => {
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
        className={globalStyles.input}
        placeholder="You must enter an obsession to play!"
        value={value}
        onInput={this.handleInput}
        onChange={this.handleInput}
      />
    );
  }

  render() {
    return (
      <div className={styles.section}>
        <p className={styles.title}>You are obsessed with doing the following:</p>
        {this.renderGoal()}
      </div>
    );
  }
}
