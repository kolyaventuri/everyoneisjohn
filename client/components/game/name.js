// @flow

import React from 'react';
import debounce from 'debounce';

import {DEBOUNCE_AMOUNT} from '../../constants/sockets';
import socket from '../../socket';

import styles from './name.scss';

type Props = {|
  value: string
|};

type State = {|
  value: string
|};

class Name extends React.Component<Props, State> {
  constructor(...args) {
    super(...args);

    this.state = {
      value: this.props.value
    };

    this.submitName = debounce(this.submitName, DEBOUNCE_AMOUNT);
  }

  handleInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.persist();

    const {
      target: {
        value
      }
    } = e;

    this.setState({value});

    this.submitName(value);
  };

  submitName = (name: string) => {
    socket.emit('updatePlayer', {name});
  }

  render() {
    const {value} = this.state;

    return (
      <div className={styles.name}>
        <p>You are</p>
        <input
          className={styles.text}
          data-type="name"
          value={value}
          onInput={this.handleInput}
          onChange={this.handleInput}
        />
      </div>
    );
  }
}

export default Name;
