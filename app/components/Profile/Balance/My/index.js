import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, BUTTON_THEMES } from '../../../UIKit';
import styles from './styles.scss';

export class MyBalance extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) { // eslint-disable-line no-useless-constructor
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
            <Button theme={BUTTON_THEMES.DEFAULT_BLUE_INVERSE}>Top Up</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), {})(MyBalance);
