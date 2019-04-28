// @flow

import React from 'react';
import debounce from 'debounce';

import {DEBOUNCE_AMOUNT} from '../../constants/sockets';
import socket from '../../socket';

import styles from './name.scss';

type Props = {|
  value: string
|};

class Name extends React.Component<Props> {
  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {
      target: {
        value: name
      }
    } = e;

    socket.emit('updatePlayer', {name});
  }

  render() {
    const {value} = this.props;

    return (
      <div className={styles.name}>
        <p>You are</p>
        <input
          className={styles.text}
          data-type="name"
          defaultValue={value}
          onChange={debounce(this.handleChange, DEBOUNCE_AMOUNT)}
        />
      </div>
    );
  }
}

export default Name;
