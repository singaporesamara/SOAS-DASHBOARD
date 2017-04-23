import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { omit } from 'lodash';

export const THEMES = {
  GREEN: 'green',
  GREEN_SLIM: 'green-slim',
  GREEN_INVERSE: 'green-inverse',
  GREEN_INVERSE_SLIM: 'green-inverse-slim',
  DEFAULT_BLUE: 'default-blue',
  DEFAULT_BLUE_INVERSE: 'default-blue-inverse',
  DEFAULT_GREEN: 'default-green',
  DEFAULT_GREEN_INVERSE: 'default-green-inverse',
  DEFAULT_GRAY: 'default-gray',
  DEFAULT_GRAY_INVERSE: 'default-gray-inverse',
};

export default class Button extends Component { // eslint-disable-line
  static propTypes = {
    theme: PropTypes.string,
    tiny: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  };

  static defaultProps = {
    theme: THEMES.GREEN,
    tiny: false,
  };

  render() {
    const theme = this.props.theme;
    const propsToRender = omit(this.props, ['theme', 'className']);
    const buttonStyles = classNames('button', {
      '-green': theme === THEMES.GREEN,
      '-green -slim': theme === THEMES.GREEN_SLIM,
      '-green -inverse': theme === THEMES.GREEN_INVERSE,
      '-green -inverse -slim': theme === THEMES.GREEN_INVERSE_SLIM,
      '-default -blue': theme === THEMES.DEFAULT_BLUE,
      '-default -blue -inverse': theme === THEMES.DEFAULT_BLUE_INVERSE,
      '-default -green': theme === THEMES.DEFAULT_GREEN,
      '-default -green -inverse': theme === THEMES.DEFAULT_GREEN_INVERSE,
      '-default -gray': theme === THEMES.DEFAULT_GRAY,
      '-default -gray -inverse': theme === THEMES.DEFAULT_GRAY_INVERSE,
      '-tiny': this.props.tiny,
    });
    return (
      <button className={buttonStyles} {...propsToRender}>{this.props.children}</button>
    );
  }
}
