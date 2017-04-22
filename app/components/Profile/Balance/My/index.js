import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './styles.scss';

export class MyBalance extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className={styles.balance}>
        <div className={styles.companyName}>Apple PTE Ltd</div>
        <div className={styles.accountBalance}>
          <div className={styles.accountBalanceAmount}>30 000 SGD</div>
          <div className={styles.accountBalanceTitle}>Account balance</div>
        </div>
        <div className={styles.eWalletBalance}>
          <div>
            <div className={styles.eWalletBalanceAmount}>2500 SGD</div>
            <div className={styles.eWalletBalanceTitle}>e-Wallet balance</div>
          </div>
          <div>
            Top up
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), {})(MyBalance);
