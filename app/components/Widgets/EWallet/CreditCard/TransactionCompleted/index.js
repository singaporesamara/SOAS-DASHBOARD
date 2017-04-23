import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, BUTTON_THEMES } from '../../../../UIKit';
import { triggerWalletTopUp } from '../../../../../actions/wallet';
import { backToForm } from '../actions';
import styles from './styles.scss';
import successIcon from '../../../../../assets/images/icons/success-circle-green.svg';

export class TransactionCompleted extends Component {
  static propTypes = {
    backToForm: PropTypes.func.isRequired,
    triggerWalletTopUp: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onOKClick = ::this.onOKClick;
  }

  onOKClick(event) {
    event.preventDefault();
    this.props.triggerWalletTopUp({ opened: false });
    this.props.backToForm();
  }

  render() {
    return (
      <div className={styles.transactionStatus}>
        <div className={styles.transactionStatusTitle}>
          Transaction completed
        </div>
        <div className={styles.transactionStatusIcon}>
          <img src={successIcon} alt="Success" />
        </div>
        <div className={styles.transactionStatusButton}>
          <Button theme={BUTTON_THEMES.DEFAULT_GREEN_INVERSE} onClick={this.onOKClick}>OK</Button>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), { backToForm, triggerWalletTopUp })(TransactionCompleted);
