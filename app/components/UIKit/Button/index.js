import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { omit } from 'lodash';

export const THEMES = { GREEN: 'green', GREEN_SLIM: 'green-slim', GREEN_INVERSE: 'green-inverse', GREEN_INVERSE_SLIM: 'green-inverse-slim' };

export default class Button extends Component { // eslint-disable-line
  static propTypes = {
    theme: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  };

  static defaultProps = {
    theme: THEMES.GREEN,
  };

  render() {
    const theme = this.props.theme;
    const propsToRender = omit(this.props, ['theme', 'className']);
    const buttonStyles = classNames('button', {
      '-green': theme === THEMES.GREEN,
      '-green -slim': theme === THEMES.GREEN_SLIM,
      '-green -inverse': theme === THEMES.GREEN_INVERSE,
      '-green -inverse -slim': theme === THEMES.GREEN_INVERSE_SLIM,
    });
    return (
      <button className={buttonStyles} {...propsToRender}>{this.props.children}</button>
    );
  }
}
