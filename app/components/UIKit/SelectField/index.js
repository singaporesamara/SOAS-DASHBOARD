import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import { omit } from 'lodash';
import classNames from 'classnames';
import styles from './styles.scss';
import chevronIcon from '../../../assets/images/icons/chevron-down.svg';

export const THEMES = { OLD: 'old', INTERNAL: 'internal' };

export default class SelectField extends Component {
  static propTypes = {
    theme: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    theme: THEMES.OLD,
  };

  constructor(props, context) {
    super(props, context);
    this.renderArrow = ::this.renderArrow;
  }

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
    const selectStyles = classNames(styles.select, this.props.className, {
      [styles.selectOld]: this.props.theme === THEMES.OLD,
      [styles.selectInternal]: this.props.theme === THEMES.INTERNAL,
    });
    return (
      <div className={selectStyles}>
        {this.renderLabel()}
        {this.renderSelectField()}
      </div>
    );
  }
}
