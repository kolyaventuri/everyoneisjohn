// @flow

import React from 'react';
import debounce from 'debounce';

import socket from '../../socket';
import {DEBOUNCE_AMOUNT} from '../../constants/sockets';

import {store} from '../../store';
import globalStyles from '../../sass/global.scss';
import styles from './section.scss';

type Props = {|
  value: string,
  frozen: boolean
|};

export default class Goal extends React.Component<Props> {
  constructor(...args) {
    super(...args);

    this.submitGoal = debounce(this.submitGoal, DEBOUNCE_AMOUNT);
  }

  handleInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.persist();

    const {
      target: {
        value: goal
      }
    } = e;

    store.dispatch({
      type: 'SET_PLAYER_INFO',
      payload: {goal}
    });

    this.submitGoal(goal);
  }

  submitGoal = (goal: string) => {
    socket.emit('updateStats', {goal});
  }

  renderGoal = () => {
    const {frozen, value} = this.props;

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
