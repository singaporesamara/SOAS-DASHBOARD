import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import CreditCardForm from './CreditCardForm';
import Loader from './Loader';
import TransactionCompleted from './TransactionCompleted';
import TransactionDeclined from './TransactionDeclined';

export class CreditCardWidget extends Component {
  static propTypes = {
    widget: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const widget = this.props.widget.toJS();
    const { transaction } = widget;
    if (widget.loading) return <Loader />;
    if (transaction.completed) return <TransactionCompleted />;
    if (transaction.declined) return <TransactionDeclined />;
    return <CreditCardForm widget={widget} />;
  }
}

function mapStateToProps(state) {
  return {
    widget: state.getIn(['widgets', 'eWalletCreditCard']),
  };
}

export default connect(mapStateToProps, {})(CreditCardWidget);
