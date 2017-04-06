import React, { Component, PropTypes } from 'react';
import { omit } from 'lodash';
import MaterialTextInput from './Material';
import DefaultTextInput from './Default';

export const THEMES = { MATERIAL: 'material', DEFAULT: 'default' };

export default class TextInput extends Component {
  static propTypes = {
    theme: PropTypes.string,
  };

  static defaultProps = {
    theme: THEMES.MATERIAL,
  };

  render() {
    const propsToRender = omit(this.props, ['theme']);
    return {
      [THEMES.MATERIAL]: <MaterialTextInput {...propsToRender} />,
      [THEMES.DEFAULT]: <DefaultTextInput {...propsToRender} />,
    }[this.props.theme];
  }
}
