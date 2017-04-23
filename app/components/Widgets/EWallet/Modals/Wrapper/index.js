import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { triggerWalletTopUp } from '../../../../../actions/wallet';
import styles from './styles.scss';
import crossIcon from '../../../../../assets/images/icons/cross-white.svg';

export class EWalletModalWrapper extends Component {
  static propTypes = {
    opened: PropTypes.bool,
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    opened: false,
  };

  constructor(props, context) {
    super(props, context);
    this.onWalletClose = ::this.onWalletClose;
  }

  onWalletClose(event) {
    event.preventDefault();
    this.props.onClose();
  }

  render() {
    const { opened, title } = this.props;
    return (
      <Modal isOpen={opened} className={styles.dialog} overlayClassName={styles.overlay} contentLabel="EWalletModalWrapper">
        <div className={styles.modal}>
          <div className={styles.modalTitle}>
            <a href="/" className={styles.modalClose} onClick={this.onWalletClose}>
              <img src={crossIcon} alt="Close" />
            </a>
            {title}
          </div>
          <div>
            {this.props.children}
          </div>
        </div>
      </Modal>
    );
  }
}

export default connect(() => ({}), { triggerWalletTopUp })(EWalletModalWrapper);
