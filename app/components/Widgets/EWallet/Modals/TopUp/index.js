import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import EWalletModalWrapper from '../Wrapper';
import CreditCardWidget from '../../Forms/CreditCard';
import { clearFormErrors } from '../../../../../actions/common';
import { VALIDATION_TYPES } from '../../../../../constants/common';
import { triggerWalletTopUp } from '../../../../../actions/wallet';
import styles from './styles.scss';

export class EWalletTopUpModalWidget extends Component {
  static propTypes = {
    widget: PropTypes.object.isRequired,
    formWidget: PropTypes.object.isRequired,
    triggerWalletTopUp: PropTypes.func.isRequired,
    clearFormErrors: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { selectedTabIndex: 0 };
    this.onWalletClose = ::this.onWalletClose;
  }

  onWalletClose() {
    this.props.clearFormErrors('eWalletCreditCard', { type: VALIDATION_TYPES.WIDGET });
    this.props.triggerWalletTopUp({ opened: false });
  }

  render() {
    const { widget, formWidget } = this.props;
    const { opened } = widget.toJS();
    const { loading } = formWidget.toJS();
    return (
      <EWalletModalWrapper opened={opened} title="Top up eWallet" onClose={this.onWalletClose} loading={loading}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <Tabs className="tabs -centered-buttons">
              <TabList className="tabs-head" activeTabClassName="-selected">
                <Tab className="tabs-head-item">
                  Credit Card
                </Tab>
                <Tab className="tabs-head-item">
                  GIRO
                </Tab>
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
    formWidget: state.getIn(['widgets', 'eWalletCreditCard']),
  };
}

export default connect(mapStateToProps, { triggerWalletTopUp, clearFormErrors })(EWalletTopUpModalWidget);
