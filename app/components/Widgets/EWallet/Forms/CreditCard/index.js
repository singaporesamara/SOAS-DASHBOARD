import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { triggerWalletTopUp } from '../../../../../actions/wallet';
import { clearFormErrors } from '../../../../../actions/common';
import { VALIDATION_TYPES } from '../../../../../constants/common';
import { backToForm } from './actions';
import CreditCardForm from './CreditCardForm';
import TransactionCompleted from '../../Messages/TransactionCompleted';
import TransactionDeclined from './TransactionDeclined';

export class CreditCardWidget extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    widget: PropTypes.object.isRequired,
    triggerWalletTopUp: PropTypes.func.isRequired,
    backToForm: PropTypes.func.isRequired,
    clearFormErrors: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onClose = ::this.onClose;
  }

  onClose() {
    this.props.clearFormErrors('eWalletCreditCard', { type: VALIDATION_TYPES.WIDGET });
    this.props.triggerWalletTopUp({ opened: false });
    this.props.backToForm();
  }

  render() {
    const widget = this.props.widget.toJS();
    const { transaction } = widget;
    if (transaction.completed) return <TransactionCompleted onClose={this.onClose} />;
    if (transaction.declined) return <TransactionDeclined />;
    return <CreditCardForm widget={widget} />;
  }
}

function mapStateToProps(state) {
  return {
    widget: state.getIn(['widgets', 'eWalletCreditCard']),
  };
}

export default connect(mapStateToProps, { triggerWalletTopUp, backToForm, clearFormErrors })(CreditCardWidget);
