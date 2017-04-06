import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import { omit } from 'lodash';
import classNames from 'classnames';
import styles from './styles.scss';
import chevronIcon from '../../../assets/images/icons/chevron-down.svg';

export default class SelectField extends Component {
  static propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    className: PropTypes.string,
  };

  renderArrow() {
    return (
      <div className={styles.selectArrow}>
        <img src={chevronIcon} alt="chevron" />
      </div>
    );
  }

  renderOption(option, i) {
    return (
      <div key={i} className={styles.selectFieldOption}>{option.label}</div>
    );
  }

  renderLabel() {
    const labelStyles = classNames(styles.selectLabel, { [styles.selectLabelInvalid]: this.props.error });
    return this.props.label ? (
      <div className={labelStyles}>{this.props.label}</div>
    ) : null;
  }

  renderError() {
    return this.props.error ? (
      <div className={styles.selectFieldError}>
        {this.props.error}
      </div>
    ) : null;
  }

  renderSelectField() {
    const selectStyles = classNames(styles.selectField, { [styles.selectFieldInvalid]: this.props.error });
    const props = omit(this.props, ['error', 'label']);
    return (
      <div className={selectStyles}>
        <Select {...props} arrowRenderer={this.renderArrow} optionRenderer={this.renderOption} />
        {this.renderError()}
      </div>
    );
  }

  render() {
    return (
      <div className={`${styles.select} ${this.props.className}`}>
        {this.renderLabel()}
        {this.renderSelectField()}
      </div>
    );
  }
}
