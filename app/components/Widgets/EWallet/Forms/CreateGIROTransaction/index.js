import React, { Component } from 'react';
import { connect } from 'react-redux';

export class CreateGIROTransaction extends Component {
  render() {
    return (
      <div>hey from GIRO form...</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    widget: state.getIn(['widgets', 'eWalletCreateTransactionForm']),
  };
}

export default connect(mapStateToProps, {})(CreateGIROTransaction);
