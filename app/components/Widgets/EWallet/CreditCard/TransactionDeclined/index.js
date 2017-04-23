import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, BUTTON_THEMES } from '../../../../UIKit';
import { backToForm } from '../actions';
import styles from './styles.scss';
import errorIcon from '../../../../../assets/images/icons/times-circle-red.svg';

export class TransactionDeclined extends Component {
  static propTypes = {
    backToForm: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onOKClick = ::this.onOKClick;
  }

  onOKClick(event) {
    event.preventDefault();
    this.props.backToForm();
  }

  render() {
    return (
      <div className={styles.transactionStatus}>
        <div className={styles.transactionStatusTitle}>
          Transaction declined
        </div>
        <div className={styles.transactionStatusIcon}>
          <img src={errorIcon} alt="Declined" />
        </div>
        <div className={styles.transactionStatusButton}>
          <Button theme={BUTTON_THEMES.DEFAULT_GRAY_INVERSE} onClick={this.onOKClick}>OK</Button>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), { backToForm })(TransactionDeclined);
