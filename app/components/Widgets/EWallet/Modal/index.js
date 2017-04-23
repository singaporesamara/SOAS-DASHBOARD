import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CreditCardWidget from '../CreditCard';
import { triggerWalletTopUp } from '../../../../actions/wallet';
import styles from './styles.scss';
import crossIcon from '../../../../assets/images/icons/cross-white.svg';

export class EWalletModalWidget extends Component {
  static propTypes = {
    widget: PropTypes.object.isRequired,
    triggerWalletTopUp: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onWalletClose = ::this.onWalletClose;
  }

  onWalletClose(event) {
    event.preventDefault();
    this.props.triggerWalletTopUp({ opened: false });
  }

  render() {
    const { widget } = this.props;
    const { opened } = widget.toJS();
    return (
      <Modal isOpen={opened} className={styles.dialog} overlayClassName={styles.overlay} contentLabel="EWalletModalWidget">
        <div className={styles.modal}>
          <div className={styles.modalTitle}>
            <a href="/" className={styles.modalClose} onClick={this.onWalletClose}>
              <img src={crossIcon} alt="Close" />
            </a>
            Top up eWallet
          </div>
          <div className={styles.modalContent}>
            <Tabs className="tabs -blue-and-white">
              <TabList className="tabs-head" activeTabClassName="-selected">
                <Tab className="tabs-head-item">by credit card</Tab>
                <Tab className="tabs-head-item">by GIRO</Tab>
              </TabList>
              <TabPanel className="tabs-content">
                <div className={styles.creditCard}>
                  <CreditCardWidget />
                </div>
              </TabPanel>
              <TabPanel className="tabs-content">
                <div>
                  eWallet transactions by GIRO is currently in dev mode..
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    widget: state.getIn(['widgets', 'eWalletModal']),
  };
}

export default connect(mapStateToProps, { triggerWalletTopUp })(EWalletModalWidget);
