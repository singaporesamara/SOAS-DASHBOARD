import React, { Component, PropTypes } from 'react';
import { omit } from 'lodash';

export default class Button extends Component { // eslint-disable-line
  static propTypes = {
    // theme: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  };

  render() {
    const propsToRender = omit(this.props, ['theme', 'className']);
    return (
      <button className="button -green" {...propsToRender}>{this.props.children}</button>
    );
  }
}
