import React, { Component, PropTypes } from 'react';

export default class TransactionRow extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    event: PropTypes.object.isRequired,
  };

  render() {
    const { event } = this.props;
    return (
      <tr>
        <td className="-w10">{event.date}</td>
        <td className="-w20">{event.title}</td>
        <td className="-w15">{event.amount} SGD</td>
        <td className="-w15">{event.source}</td>
        <td className="-w40">{event.description}</td>
      </tr>
    );
  }
}
