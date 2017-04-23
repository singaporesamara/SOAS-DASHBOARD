import React, { Component, PropTypes } from 'react';
import { omit } from 'lodash';
import MaterialTextInput from './Material';
import DefaultTextInput from './Default';
import BorderedTextInput from './Bordered';

export const THEMES = { MATERIAL: 'material', DEFAULT: 'default', BORDERED: 'bordered' };

export default class TextInput extends Component {
  static propTypes = {
    theme: PropTypes.string,
  };

  static defaultProps = {
    theme: THEMES.DEFAULT,
  };

  render() {
    const propsToRender = omit(this.props, ['theme']);
    return {
      [THEMES.MATERIAL]: <MaterialTextInput {...propsToRender} />,
      [THEMES.DEFAULT]: <DefaultTextInput {...propsToRender} />,
      [THEMES.BORDERED]: <BorderedTextInput {...propsToRender} />,
    }[this.props.theme];
  }
}
