import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';

export default class Wrapper extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className={styles.wrapper}>
        {this.props.children}
      </div>
    );
  }
}
