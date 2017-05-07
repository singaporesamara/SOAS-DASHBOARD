import React, { Component, PropTypes } from 'react';
import { Button, BUTTON_THEMES } from '../../../../UIKit';
import styles from './styles.scss';
import pendingIcon from '../../../../../assets/images/icons/pending-watch.svg';

export default class TransactionPending extends Component {
  static propTypes = {
    onClose: PropTypes.func,
  };

  static defaultProps = {
    onClose: () => {},
  };

  constructor(props, context) {
    super(props, context);
    this.onOKClick = ::this.onOKClick;
  }

  onOKClick(event) {
    event.preventDefault();
    this.props.onClose();
  }

  render() {
    return (
      <div className={styles.transactionStatus}>
        <div className={styles.transactionStatusTitle}>
          Transaction is pending
        </div>
        <div className={styles.transactionStatusSubTitle}>
          Check status of transaction <br /> in your News
        </div>
        <div className={styles.transactionStatusIcon}>
          <img src={pendingIcon} alt="Pending" />
        </div>
        <div className={styles.transactionStatusButton}>
          <Button theme={BUTTON_THEMES.DEFAULT_GOLD_INVERSE} onClick={this.onOKClick}>OK</Button>
        </div>
      </div>
    );
  }
}
