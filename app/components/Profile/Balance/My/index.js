import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, BUTTON_THEMES } from '../../../UIKit';
import { toMoneyString } from '../../../../utils/helpers';
import styles from './styles.scss';

export class MyBalance extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    profile: PropTypes.object,
  };

  constructor(props, context) { // eslint-disable-line no-useless-constructor
    super(props, context);
  }

  render() {
    const { balance } = this.props.profile;
    return (
      <div className={styles.balance}>
        <div className={styles.companyName}>Apple PTE Ltd</div>
        <div className={styles.accountBalance}>
          <div className={styles.accountBalanceAmount}>{toMoneyString(balance.account)}</div>
          <div className={styles.accountBalanceTitle}>Account balance</div>
        </div>
        <div className={styles.eWalletBalance}>
          <div>
            <div className={styles.eWalletBalanceAmount}>{toMoneyString(balance.eWallet)}</div>
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
