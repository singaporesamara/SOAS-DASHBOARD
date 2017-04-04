import React, { Component, PropTypes } from 'react';
import { omit, isEmpty, isFunction, uniqueId } from 'lodash';
import classNames from 'classnames';
import styles from './styles.scss';
import errorIcon from '../../../assets/images/icons/times.svg';
import successIcon from '../../../assets/images/icons/checkmark.svg';

export default class TextInput extends Component {
  static propTypes = {
    label: PropTypes.string,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    error: PropTypes.string,
    success: PropTypes.bool,
  };

  static defaultProps = {
    success: false,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { hasValue: false, id: uniqueId('TextInput-') };
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFocus(event) {
    const value = event.target.value;
    this.setState({ hasValue: !isEmpty(value) });
    if (isFunction(this.props.onFocus)) {
      this.props.onFocus(event);
    }
  }

  onChange(event) {
    const value = event.target.value;
    this.setState({ hasValue: !isEmpty(value) });
    if (isFunction(this.props.onChange)) {
      this.props.onChange(event);
    }
  }

  renderErrors() {
    return this.props.error ? (
      <div>
        <span className="text-input-error">{this.props.error}</span>
        <span className="text-input-icon -right"><img src={errorIcon} alt="error" /></span>
      </div>
    ) : null;
  }

  renderIcons() {
    return this.props.success ? (
      <div>
        <span className="text-input-icon -right"><img src={successIcon} alt="success" /></span>
      </div>
    ) : null;
  }

  render() {
    const propsToRender = omit(this.props, ['label', 'onFocus', 'onChange', 'id', 'autoComplete', 'error']);
    const labelStyles = classNames('text-input-label', { '-floating': this.state.hasValue });
    return (
      <div className={classNames('text-input', styles.textInput)}>
        <input id={this.state.id} {...propsToRender} onFocus={this.onFocus} onChange={this.onChange} autoComplete="off" />
        <label htmlFor={this.state.id} className={labelStyles}>{this.props.label}</label>
        {this.renderErrors()}
        {this.renderIcons()}
      </div>
    );
  }
}
