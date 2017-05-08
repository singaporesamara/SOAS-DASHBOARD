import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import EWalletModalWrapper from '../Wrapper';
import { CreateInvoiceForm } from '../../Forms/';
import { clearFormErrors, triggerModal } from '../../../../../actions/common';
import { VALIDATION_TYPES } from '../../../../../constants/common';
import styles from './styles.scss';

export class EWalletCreateInvoiceModalWidget extends Component {
  static propTypes = {
    widget: PropTypes.object.isRequired,
    formWidget: PropTypes.object.isRequired,
    clearFormErrors: PropTypes.func.isRequired,
    triggerModal: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onWalletClose = ::this.onWalletClose;
  }

  onWalletClose() {
    this.props.clearFormErrors('eWalletCreateTransactionForm', { type: VALIDATION_TYPES.WIDGET });
    this.props.triggerModal('eWalletCreateInvoiceModal', { opened: false });
  }

  render() {
    const { widget, formWidget } = this.props;
    const { opened } = widget.toJS();
    const { loading } = formWidget.toJS();
    return (
      <EWalletModalWrapper opened={opened} styles={styles.dialog} title="Add Item" onClose={this.onWalletClose} loading={loading}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalContentForm}>
              <CreateInvoiceForm />
            </div>
          </div>
        </div>
      </EWalletModalWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    widget: state.getIn(['widgets', 'eWalletCreateInvoiceModal']),
    formWidget: state.getIn(['widgets', 'eWalletCreateTransactionForm']),
  };
}

export default connect(mapStateToProps, { clearFormErrors, triggerModal })(EWalletCreateInvoiceModalWidget);
