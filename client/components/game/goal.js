// @flow

import React from 'react';
import cx from 'classnames';
import socket from '../../socket';

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
        className={globalStyles.input}
        placeholder="You must enter an obsession to play!"
        defaultValue={value}
        onChange={this.handleChange}
      />
    );
  }

  renderSubmit = () => {
    const {frozen} = this.props;

    if (frozen) {
      return null;
    }

    return (
      <button
        type="button"
        className={cx(globalStyles.btn, styles.button)}
        onClick={this.submitGoal}
      >
        Submit Obsession
      </button>
    );
  }

  render() {
    return (
      <div className={styles.section}>
        <p className={styles.title}>You are obsessed with doing the following:</p>
        {this.renderGoal()}
        {this.renderSubmit()}
      </div>
    );
  }
}
