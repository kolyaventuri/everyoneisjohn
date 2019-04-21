// @flow

import React from 'react';
import cx from 'classnames';

import styles from './ticker.scss';

type Props = {|
  value: number,
  onChange: (val: number) => void,
  className?: string
|};

class Ticker extends React.Component<Props> {
  static defaultProps = {
    className: ''
  };

  handleIncrement = () => this.props.onChange(1)

  handleDecrement = () => this.props.onChange(-1)

  render() {
    const {value, className} = this.props;

    return (
      <div className={cx(styles.ticker, className)}>
        <a
          href="#"
          className={styles.decrement}
          data-action="decrement"
          onClick={this.handleDecrement}
        >
          -
        </a>
        <p data-type="value">{value}</p>
        <a
          href="#"
          className={styles.increment}
          data-action="increment"
          onClick={this.handleIncrement}
        >
          +
        </a>
      </div>
    );
  }
}

export default Ticker;
