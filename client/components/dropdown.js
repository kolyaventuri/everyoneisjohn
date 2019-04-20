// @flow

import React from 'react';
import uuid from 'uuid/v4';

type Option = string | number;

type Props = {|
  options: Array<Option>,
  selected: ?Option,
  onChange?: (value: Option) => void
|};

type State = {|
  selected: ?Option
|};

export default class Dropdown extends React.Component<Props, State> {
  static defaultProps = {
    onChange: () => {}
  };

  constructor(...args: any) {
    super(...args);
    const {selected} = this.props;

    this.state = {selected};
  }

  onChange = ({target: {value}}: SyntheticInputEvent<HTMLInputElement>) => {
    const {onChange} = this.props;

    this.setState({selected: value});

    if (onChange) {
      onChange(value);
    }
  }

  render() {
    const {options} = this.props;
    const {selected} = this.state;

    return (
      <select
        value={selected}
        onChange={this.onChange}
      >
        {options.map(val => {
          return (
            <option
              key={uuid()}
              value={val}
            >
              {val}
            </option>
          );
        })}
      </select>
    );
  }
}
