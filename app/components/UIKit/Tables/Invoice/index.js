import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { map, sum } from 'lodash';
import { triggerModal } from '../../../../actions/common';
import { createInvoice } from '../../../../actions/invoices';
import { Button, BUTTON_THEMES, TextInput, TEXT_INPUT_THEMES } from '../../index';
import BaseComponent from '../../../../containers/Base';
import styles from './styles.scss';

export class InvoiceTable extends BaseComponent {
  static propTypes = {
    triggerModal: PropTypes.func.isRequired,
    createInvoice: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    invoice: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { buyerEmail: null };
    this.onValueChange = ::this.onValueChange;
    this.onAddItem = ::this.onAddItem;
    this.onCancel = ::this.onCancel;
    this.onSend = ::this.onSend;
  }

  onAddItem() {
    this.props.triggerModal('eWalletCreateInvoiceModal', { opened: true });
  }

  onCancel() {
    this.props.push('/app');
  }

  onSend() {
    const { total, items, gst } = this.props.invoice;
    this.props.createInvoice({ gst, email: this.state.buyerEmail, total, items });
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
          <div className={styles.tableButton}>
            <Button tiny={tiny} theme={BUTTON_THEMES.DEFAULT_BLUE_INVERSE} onClick={this.onAddItem}>Add Item</Button>
          </div>
        </td>
        <td colSpan={3}></td>
        <td>
          GST:
        </td>
        <td>
          { this.props.invoice.gst }
        </td>
      </tr>
    );
  }

  renderTotal() {
    return (
      <tr>
        <td colSpan={4}>

        </td>
        <td>
          TOTAL:
        </td>
        <td>
          { this.props.invoice.total }
        </td>
      </tr>
    );
  }

  renderSendForm() {
    const tiny = true;
    return (
      <tr>
        <td colSpan={2}>
          <TextInput placeholder="Email of buyer" onChange={this.onValueChange('buyerEmail')} theme={TEXT_INPUT_THEMES.INTERNAL} />
        </td>
        <td colSpan={2}>
        </td>
        <td colSpan={2} className="text-right">
          <div className={styles.tableButton}>
            <Button tiny={tiny} theme={BUTTON_THEMES.DEFAULT_GRAY_INVERSE} onClick={this.onCancel}>Cancel</Button>
          </div>
          <div className={styles.tableButton}>
            <Button tiny={tiny} theme={BUTTON_THEMES.DEFAULT_BLUE_INVERSE} onClick={this.onSend}>Send</Button>
          </div>
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
              { this.renderSendForm() }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(null, { push, triggerModal, createInvoice })(InvoiceTable);
