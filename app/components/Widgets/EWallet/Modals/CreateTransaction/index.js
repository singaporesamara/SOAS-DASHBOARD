import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import EWalletModalWrapper from '../Wrapper';
import { triggerWalletCreateTransaction } from '../../../../../actions/wallet';
import styles from './styles.scss';

export class EWalletCreateTransactionModalWidget extends Component {
  static propTypes = {
    widget: PropTypes.object.isRequired,
    triggerWalletCreateTransaction: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onWalletClose = ::this.onWalletClose;
  }

  onWalletClose() {
    this.props.triggerWalletCreateTransaction({ opened: false });
  }

  render() {
    const { widget } = this.props;
    const { opened } = widget.toJS();
    return (
      <EWalletModalWrapper opened={opened} title="Create eWallet transaction" onClose={this.onWalletClose}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <Tabs className="tabs -blue-and-white">
              <TabList className="tabs-head" activeTabClassName="-selected">
                <Tab className="tabs-head-item">Outcome ewallet transaction </Tab>
              </TabList>
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
    widget: state.getIn(['widgets', 'eWalletCreateTransactionModal']),
  };
}

export default connect(mapStateToProps, { triggerWalletCreateTransaction })(EWalletCreateTransactionModalWidget);
