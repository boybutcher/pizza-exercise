import React, { Component } from 'react';

class ComboItem extends Component {
  render() {
    const {
      topping,
      count,
    } = this.props.comboObj;

    return (
      <tr>
        <td>{this.props.index}</td>
        <td>{topping}</td>
        <td>{count}</td>
      </tr>
    )
  }
}

export default ComboItem;
