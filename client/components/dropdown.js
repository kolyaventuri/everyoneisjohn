// @flow

import React from 'react';
import uuid from 'uuid/v4';

type Option = string | number;

type Props = {|
  options: Array<Option>,
  selected: ?Option
|};

export default class Dropdown extends React.Component<Props> {
  render() {
    const {options, selected} = this.props;

    return (
      <select>
        {options.map(val => {
          const isSelected = selected === val;
          return (
            <option
              key={uuid()}
              value={val}
              selected={isSelected}
            >
              {val}
            </option>
          );
        })}
      </select>
    );
  }
}
