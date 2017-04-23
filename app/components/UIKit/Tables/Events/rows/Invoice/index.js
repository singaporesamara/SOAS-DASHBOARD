import React, { Component, PropTypes } from 'react';

export default class InvoiceRow extends Component {
  static propTypes = {
    event: PropTypes.object,
  };

  render() {
    const { event } = this.props;
    return (
      <tr className="-gray">
        <td className="-w10">{event.date}</td>
        <td className="-w20">{event.title}</td>
        <td className="-w30" colSpan="2">{event.description}</td>
        <td className="-w40"><a href="#" className="link -blue -underline">See invoice</a></td>
      </tr>
    );
  }
}