import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Checkbox as BaseCheckbox } from 'react-checkbox-group';
import styles from './styles.scss';

const Checkbox = (props) => {
  const className = classNames(styles.checkbox, props.className);
  return (
    <div className={className}>
      { /* eslint-disable */}
      <label>
        { /* eslint-enable */}
        <BaseCheckbox value={props.value} />
        { props.label }
        <div className={styles.check}></div>
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default Checkbox;
