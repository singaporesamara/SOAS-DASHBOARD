import React, { Component, PropTypes } from 'react';
import { omit, uniqueId } from 'lodash';
import MaskedInput from 'react-text-mask';
import classNames from 'classnames';
import { prepareMask } from '../utils';
import styles from './styles.scss';

export default class TextInput extends Component {
  static propTypes = {
    error: PropTypes.string,
    success: PropTypes.bool,
    showErrorLabel: PropTypes.bool,
    mask: PropTypes.string,
    guide: PropTypes.bool,
  };

  static defaultProps = {
    success: false,
    showErrorLabel: true,
    mask: null,
    guide: false,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { id: uniqueId('TextInput-') };
  }

  renderErrors() {
    return this.props.showErrorLabel && this.props.error ? (
      <div>
        <span className="text-input-error">{this.props.error}</span>
      </div>
    ) : null;
  }

  render() {
    const propsToRender = omit(this.props, ['id', 'autoComplete', 'error', 'success', 'mask', 'guide', 'showErrorLabel']);
    const textInputStyles = classNames('text-input -internal', styles.textInput, { [styles.textInputSuccess]: this.props.success, [styles.textInputError]: this.props.error });
    const hasMask = !!this.props.mask;
    const mask = prepareMask(this.props.mask);
    return (
      <div className={textInputStyles}>
        <div>
          {!hasMask && <input id={this.state.id} {...propsToRender} autoComplete="off" />}
          {hasMask && <MaskedInput id={this.state.id} {...propsToRender} guide={this.props.guide} autoComplete="off" mask={mask} />}
        </div>
        {this.renderErrors()}
      </div>
    );
  }
}
