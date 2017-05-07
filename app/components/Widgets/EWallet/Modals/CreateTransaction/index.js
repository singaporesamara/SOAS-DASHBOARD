import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import EWalletModalWrapper from '../Wrapper';
import { CreateTransactionForm, CreateGIROTransactionForm } from '../../Forms/';
import { clearFormErrors } from '../../../../../actions/common';
import { VALIDATION_TYPES } from '../../../../../constants/common';
import { triggerWalletCreateTransaction } from '../../../../../actions/wallet';
import styles from './styles.scss';

export class EWalletCreateTransactionModalWidget extends Component {
  static propTypes = {
    widget: PropTypes.object.isRequired,
    formWidget: PropTypes.object.isRequired,
    triggerWalletCreateTransaction: PropTypes.func.isRequired,
    clearFormErrors: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onWalletClose = ::this.onWalletClose;
  }

  onWalletClose() {
    this.props.clearFormErrors('eWalletCreateTransactionForm', { type: VALIDATION_TYPES.WIDGET });
    this.props.triggerWalletCreateTransaction({ opened: false });
  }

  render() {
    const { widget, formWidget } = this.props;
    const { opened } = widget.toJS();
    const { loading } = formWidget.toJS();
    return (
      <EWalletModalWrapper opened={opened} title="Create Transaction" onClose={this.onWalletClose} loading={loading}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <Tabs className="tabs -centered-buttons">
              <TabList className="tabs-head" activeTabClassName="-selected">
                <Tab className="tabs-head-item">eWallet</Tab>
                <Tab className="tabs-head-item">GIRO</Tab>
              </TabList>
              <TabPanel className="tabs-content">
                <div className={styles.modalContentForm}>
                  <CreateTransactionForm />
                </div>
              </TabPanel>
              <TabPanel className="tabs-content">
                <CreateGIROTransactionForm />
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
    formWidget: state.getIn(['widgets', 'eWalletCreateTransactionForm']),
  };
}

export default connect(mapStateToProps, { triggerWalletCreateTransaction, clearFormErrors })(EWalletCreateTransactionModalWidget);
