import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, BUTTON_THEMES } from '../../../UIKit';
import { toMoneyString } from '../../../../utils/helpers';
import { triggerWalletTopUp } from '../../../../actions/wallet';
import styles from './styles.scss';

const DEFAULT_COMPANY_NAME = 'Nameless Company';

export class MyBalance extends Component {
  static propTypes = {
    profile: PropTypes.object,
    triggerWalletTopUp: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onTopUpClick = ::this.onTopUpClick;
  }

  onTopUpClick(event) {
    event.preventDefault();
    this.props.triggerWalletTopUp({ opened: true });
  }

  render() {
    const { balance, company } = this.props.profile;
    return (
      <div className={styles.balance}>
        <div className={styles.companyName}>{company.name || DEFAULT_COMPANY_NAME}</div>
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
            <Button theme={BUTTON_THEMES.DEFAULT_BLUE_INVERSE} onClick={this.onTopUpClick}>Top Up</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), { triggerWalletTopUp })(MyBalance);
