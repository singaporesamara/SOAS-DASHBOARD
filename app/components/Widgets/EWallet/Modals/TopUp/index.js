import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import EWalletModalWrapper from '../Wrapper';
import CreditCardWidget from '../../Forms/CreditCard';
import { triggerWalletTopUp } from '../../../../../actions/wallet';
import styles from './styles.scss';

export class EWalletTopUpModalWidget extends Component {
  static propTypes = {
    widget: PropTypes.object.isRequired,
    triggerWalletTopUp: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onWalletClose = ::this.onWalletClose;
  }

  onWalletClose() {
    this.props.triggerWalletTopUp({ opened: false });
  }

  render() {
    const { widget } = this.props;
    const { opened } = widget.toJS();
    return (
      <EWalletModalWrapper opened={opened} title="Top up eWallet" onClose={this.onWalletClose}>
        <div className={styles.modal}>
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
      </EWalletModalWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    widget: state.getIn(['widgets', 'eWalletTopUpModal']),
  };
}

export default connect(mapStateToProps, { triggerWalletTopUp })(EWalletTopUpModalWidget);
