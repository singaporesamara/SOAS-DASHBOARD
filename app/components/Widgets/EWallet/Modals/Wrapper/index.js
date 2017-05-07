import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BlockUi from 'react-block-ui';
import Modal from 'react-modal';
import classNames from 'classnames';
import { triggerWalletTopUp } from '../../../../../actions/wallet';
import styles from './styles.scss';
import crossIcon from '../../../../../assets/images/icons/cross-gray.svg';

export class EWalletModalWrapper extends Component {
  static propTypes = {
    opened: PropTypes.bool,
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    opened: false,
    loading: false,
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
    const { opened, title, loading } = this.props;
    const loaderStyles = classNames({ [styles.modalLoader]: loading });
    return (
      <Modal isOpen={opened} className={styles.dialog} overlayClassName={styles.overlay} contentLabel="EWalletModalWrapper">
        <div className={styles.modal}>
          <BlockUi tag="div" blocking={loading} className={loaderStyles}>
            <div className={styles.modalTitle}>
              <a href="/" className={styles.modalClose} onClick={this.onWalletClose}>
                <img src={crossIcon} alt="Close" />
              </a>
              {title}
            </div>
            <div>
              {this.props.children}
            </div>
          </BlockUi>
        </div>
      </Modal>
    );
  }
}

export default connect(() => ({}), { triggerWalletTopUp })(EWalletModalWrapper);
