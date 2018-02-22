import React, { Component } from 'react';

class ComboItem extends Component {
  render() {
    const {
      comboObj: {
        topping,
        count,
      },
      index,
    } = this.props;

    return (
      <tr>
        <td>{index}</td>
        <td>{topping}</td>
        <td>{count}</td>
      </tr>
    )
  }
}

export default ComboItem;
