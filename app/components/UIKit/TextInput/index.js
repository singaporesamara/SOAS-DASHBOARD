import React, { Component, PropTypes } from 'react';
import { omit, isEmpty, isFunction, uniqueId } from 'lodash';
import classNames from 'classnames';
import styles from './styles.scss';

export default class TextInput extends Component {
  static propTypes = {
    label: PropTypes.string,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
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

  render() {
    const propsToRender = omit(this.props, ['label', 'onFocus', 'onChange', 'id']);
    const labelStyles = classNames('text-input-label', { '-floating': this.state.hasValue });
    return (
      <div className={classNames('text-input', styles.textInput)}>
        <input id={this.state.id} {...propsToRender} onFocus={this.onFocus} onChange={this.onChange} />
        <label htmlFor={this.state.id} className={labelStyles}>{this.props.label}</label>
      </div>
    );
  }
}
