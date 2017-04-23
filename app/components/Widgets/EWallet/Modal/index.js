import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CreditCardWidget } from '../../index';
import styles from './styles.scss';
import crossIcon from '../../../../assets/images/icons/cross-white.svg';

export class EWalletModalWidget extends Component {
  static propTypes = {
    visible: PropTypes.bool,
  };

  static defaultProps = {
    visible: false,
  };

  render() {
    const opened = this.props.visible;
    return (
      <Modal isOpen={opened} className={styles.dialog} overlayClassName={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.modalTitle}>
            <a href="/" className={styles.modalClose}><img src={crossIcon} alt="Close" /></a>
            Top up eWallet
          </div>
          <div className={styles.modalContent}>
            <Tabs className="tabs -blue-and-white">
              <TabList className="tabs-head" activeTabClassName="-selected">
                <Tab className="tabs-head-item">by credit card</Tab>
                <Tab className="tabs-head-item">by GIRO</Tab>
              </TabList>
              <TabPanel className="tabs-content">
                <CreditCardWidget />
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

export default connect(() => ({}), {})(EWalletModalWidget);
