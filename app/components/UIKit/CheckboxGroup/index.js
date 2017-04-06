import React, { PropTypes } from 'react';
import { CheckboxGroup as BaseCheckboxGroup } from 'react-checkbox-group';
import { omit } from 'lodash';
import styles from './styles.scss';

class CheckboxGroup extends React.Component {
  static propTypes = {
    label: PropTypes.string,
  };

  renderLabel() {
    return this.props.label ? (
      <div className={styles.checkboxGroupLabel}>{this.props.label}</div>
    ) : null;
  }

  renderCheckbox() {
    const propsToRender = omit(this.props, ['label']);
    return (
      <div className={styles.checkboxGroupField}>
        <BaseCheckboxGroup {...propsToRender} />
      </div>
    );
  }

  render() {
    return (
      <div className={styles.checkboxGroup}>
        {this.renderLabel()}
        {this.renderCheckbox()}
      </div>
    );
  }
}

export default CheckboxGroup;
