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
    this.state = { selectedTabIndex: 0 };
    this.onWalletClose = ::this.onWalletClose;
    this.onTabSelect = ::this.onTabSelect;
  }

  onWalletClose() {
    this.props.clearFormErrors('eWalletCreateTransactionForm', { type: VALIDATION_TYPES.WIDGET });
    this.props.triggerWalletCreateTransaction({ opened: false });
  }

  onTabSelect(selectedTabIndex) {
    this.setState({ selectedTabIndex });
  }

  render() {
    const { widget, formWidget, giroFormWidget } = this.props;
    const { opened } = widget.toJS();
    const loading = formWidget.toJS().loading || giroFormWidget.toJS().loading;
    const modalStyles = this.state.selectedTabIndex ? styles.dialog : '';
    return (
      <EWalletModalWrapper styles={modalStyles} opened={opened} title="Create Transaction" onClose={this.onWalletClose} loading={loading}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <Tabs className="tabs -centered-buttons" onSelect={this.onTabSelect} selectedIndex={this.state.selectedTabIndex}>
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
                <div className={styles.modalContentForm}>
                  <CreateGIROTransactionForm />
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
    formWidget: state.getIn(['widgets', 'eWalletCreateTransactionForm']),
    giroFormWidget: state.getIn(['widgets', 'eWalletCreateGIROTransactionForm']),
  };
}

export default connect(mapStateToProps, { triggerWalletCreateTransaction, clearFormErrors })(EWalletCreateTransactionModalWidget);
