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

export default class Goal extends React.Component<Props> {
  submitGoal = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {
      target: {
        value: goal
      }
    } = e;

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
        defaultValue={value}
        onChange={debounce(this.submitGoal, DEBOUNCE_AMOUNT)}
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
