import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { map, sum } from 'lodash';
import { triggerModal } from '../../../../actions/common';
import { Button, BUTTON_THEMES } from '../../index';
import styles from './styles.scss';

export class InvoiceTable extends Component {
  static propTypes = {
    triggerModal: PropTypes.func.isRequired,
    invoice: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onAddItem = ::this.onAddItem;
  }

  onAddItem() {
    this.props.triggerModal('eWalletCreateInvoiceModal', { opened: true });
  }

  renderInvoice() {
    return map(this.props.invoice.items, (item, index) => {
      return (<tr className={styles.tableRow} key={index}>
        <td>{ item.code }</td>
        <td>{ item.name }</td>
        <td>{ item.description }</td>
        <td>{ item.price }</td>
        <td>{ item.quantity }</td>
        <td>{ item.price * item.quantity }</td>
      </tr>);
    });
  }

  renderGST() {
    const tiny = true;
    return (
      <tr>
        <td>
          <Button tiny={tiny} theme={BUTTON_THEMES.DEFAULT_BLUE_INVERSE} onClick={this.onAddItem}>Add Item</Button>
        </td>
        <td colSpan={3}></td>
        <td>
          GST:
        </td>
        <td>
          -
        </td>
      </tr>
    );
  }

  renderTotal() {
    const total = sum(map(this.props.invoice.items, (item) => item.price * item.quantity));
    return (
      <tr>
        <td colSpan={4}>

        </td>
        <td>
          TOTAL:
        </td>
        <td>
          { total }
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div className={styles.table}>
        <div className={styles.tableWrapper}>
          <table className="table -default">
            <thead>
              <tr className="-gray">
                <td>Item Code</td>
                <td>Item Name</td>
                <td>Description</td>
                <td>Item Price</td>
                <td>Quantity</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              { this.renderInvoice() }
              { this.renderGST() }
              { this.renderTotal() }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(null, { triggerModal })(InvoiceTable);
