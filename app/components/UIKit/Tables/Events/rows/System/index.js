import React, { Component, PropTypes } from 'react';

export default class SystemRow extends Component {
  static propTypes = {
    event: PropTypes.object,
  };

  render() {
    const { event } = this.props;
    return (
      <tr className="-gray">
        <td className="-w10">{event.date}</td>
        <td className="-w20">{event.title}</td>
        <td className="-w70" colSpan="3" dangerouslySetInnerHTML={{ __html: event.description }}></td>
      </tr>
    );
  }
}