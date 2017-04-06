import React, { Component, PropTypes } from 'react';
import { omit, isEmpty, isFunction, uniqueId } from 'lodash';
import classNames from 'classnames';
import styles from './styles.scss';
import errorIcon from '../../../../assets/images/icons/danger-sign.svg';

export default class TextInput extends Component {
  static propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    success: PropTypes.bool,
  };

  static defaultProps = {
    success: false,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { id: uniqueId('TextInput-') };
  }

  renderErrors() {
    return this.props.error ? (
      <div>
        <span className="text-input-error">{this.props.error}</span>
        <span className="text-input-icon -right"><img src={errorIcon} alt="error" /></span>
      </div>
    ) : null;
  }

  render() {
    const propsToRender = omit(this.props, ['label', 'id', 'autoComplete', 'error', 'success']);
    const labelStyles = classNames('text-input-label -default');
    const textInputStyles = classNames('text-input', styles.textInput, { [styles.textInputSuccess]: this.props.success, [styles.textInputError]: this.props.error });
    return (
      <div className={textInputStyles}>
        <label htmlFor={this.state.id} className={labelStyles}>{this.props.label}</label>
        <div>
          <input id={this.state.id} {...propsToRender} onFocus={this.onFocus} onChange={this.onChange} autoComplete="off" />
        </div>
        {this.renderErrors()}
      </div>
    );
  }
}
