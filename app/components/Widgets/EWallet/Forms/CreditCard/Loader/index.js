import React, { Component } from 'react';
import styles from './styles.scss';

export default class Loader extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.loader}>
        <div className={styles.loaderTitle}>
          Transaction is in progress
        </div>
        <div className={styles.loaderIcon}>
          loader icon...
        </div>
      </div>
    );
  }
}
