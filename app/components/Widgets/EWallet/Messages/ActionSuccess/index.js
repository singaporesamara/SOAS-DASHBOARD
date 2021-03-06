import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, BUTTON_THEMES } from '../../../../UIKit';
import styles from './styles.scss';
import successIcon from '../../../../../assets/images/icons/success-circle-green.svg';

export class ActionSuccessMessage extends Component {
  static propTypes = {
    message: PropTypes.string,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    message: 'Transaction completed',
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
          { this.props.message }
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

export default connect(() => ({}), {})(ActionSuccessMessage);
