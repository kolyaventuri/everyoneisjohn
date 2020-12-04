// @flow

import React from 'react';
import cx from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus
} from '@fortawesome/free-regular-svg-icons';

import styles from './ticker.scss';

type Props = {|
  onChange?: (val: number) => void,
  value?: number,
  className?: string,
  renderValue?: boolean
|};

class Ticker extends React.Component<Props> {
  static defaultProps = {
    value: 0,
    className: '',
    renderValue: true,
    onChange: () => {}
  };

  handleIncrement = () => this.props.onChange(1)

  handleDecrement = () => this.props.onChange(-1)

  render() {
    const {value, className, renderValue} = this.props;

    return (
      <div className={cx(styles.ticker, className)}>
        <a
          href="#"
          className={styles.decrement}
          data-action="decrement"
          onClick={this.handleDecrement}
        >
          <FontAwesomeIcon icon={faMinus}/>
        </a>
        {renderValue && <p data-type="value">{value}</p>}
        <a
          href="#"
          className={styles.increment}
          data-action="increment"
          onClick={this.handleIncrement}
        >
          <FontAwesomeIcon icon={faPlus}/>
        </a>
      </div>
    );
  }
}

export default Ticker;
