import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { pick, merge } from 'lodash';
import { validateForm, clearFormErrors, triggerModal } from '../../../../../actions/common';
import { VALIDATION_TYPES } from '../../../../../constants/common';
import RULES from '../../../../../utils/validation/rules';
import BaseComponent from '../../../../../containers/Base';
import { TextInput, TEXT_INPUT_THEMES, Button, BUTTON_THEMES } from '../../../../UIKit';
import { TransactionPending } from '../../Messages';
import styles from './styles.scss';

export class CreateInvoiceForm extends BaseComponent {
  static propTypes = {
    triggerModal: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
    clearFormErrors: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { invoiceNumber: null, invoiceDate: null, companyUEN: null, buyerEmail: null, deliveryPlace: null, itemCode: null, description: null, quantity: null, unitPrice: null, subtotal: null, gst: null, total: null };
    this.onFormSubmit = ::this.onFormSubmit;
    this.onCancel = ::this.onCancel;
  }

  onFormSubmit(event) {
    event.preventDefault();
    alert('send invoice is gonna be here...');
  }

  onCancel() {
    this.props.clearFormErrors('eWalletCreateTransactionForm', { type: VALIDATION_TYPES.WIDGET });
    this.props.triggerModal('eWalletCreateInvoiceModal', { opened: false });
  }

  renderForm() {
    const widget = this.props.widget.toJS();
    const tiny = true;
    const formStyles = classNames('form', styles.form);
    const formFooterStyles = classNames('form-footer -fixed -gray pure-g form-row', styles.formFooter);
    return (
      <form className={formStyles} onSubmit={this.onFormSubmit}>
        <div className="pure-g form-row">
          <div className="pure-u-1-2 form-col">
            <TextInput placeholder="Invoice Number" onChange={this.onValueChange('invoiceNumber')} error={widget.errors.invoiceNumber} mask="digits" theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
          <div className="pure-u-1-2 form-col">
            <TextInput placeholder="Invoice Date" onChange={this.onValueChange('invoiceDate')} error={widget.errors.invoiceDate} theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
        </div>

        <div className="pure-g form-row">
          <div className="pure-u-1-2 form-col">
            <TextInput placeholder="Company UEN" onChange={this.onValueChange('companyUEN')} error={widget.errors.companyUEN} theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
          <div className="pure-u-1-2 form-col">
            <TextInput placeholder="Email of buyer" onChange={this.onValueChange('buyerEmail')} error={widget.errors.buyerEmail} theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
        </div>

        <div className="pure-g form-row">
          <div className="pure-u-1-2 form-col">
            <TextInput placeholder="Place of delivery" onChange={this.onValueChange('deliveryPlace')} error={widget.errors.deliveryPlace} theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
          <div className="pure-u-1-2 form-col"></div>
        </div>

        <div className="pure-g form-row">
          <div className="pure-u-1-2 form-col">
            <TextInput placeholder="Item code" onChange={this.onValueChange('itemCode')} error={widget.errors.itemCode} theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
          <div className="pure-u-1-2 form-col">
            <TextInput placeholder="Description" onChange={this.onValueChange('description')} error={widget.errors.description} theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
        </div>

        <div className="pure-g form-row">
          <div className="pure-u-1-2 form-col">
            <TextInput placeholder="Quantity" onChange={this.onValueChange('quantity')} error={widget.errors.quantity} theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
          <div className="pure-u-1-2 form-col">
            <TextInput placeholder="Unit price" onChange={this.onValueChange('unitPrice')} error={widget.errors.unitPrice} theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
        </div>

        <div className="pure-g form-row">
          <div className="pure-u-1-2 form-col"></div>
          <div className="pure-u-1-2 form-col">
            <TextInput placeholder="Subtotal" onChange={this.onValueChange('subtotal')} error={widget.errors.subtotal} theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
        </div>

        <div className="pure-g form-row">
          <div className="pure-u-1-1 form-col">
            <TextInput placeholder="GST" onChange={this.onValueChange('gst')} error={widget.errors.gst} theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
        </div>

        <div className="pure-g form-row">
          <div className="pure-u-1-1 form-col">
            <TextInput placeholder="Total" onChange={this.onValueChange('total')} error={widget.errors.total} theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
        </div>

        <div className={formFooterStyles}>
          <div className="pure-u-1-2 form-col -no-offset">
            <Button type="button" theme={BUTTON_THEMES.DEFAULT_GRAY_INVERSE} tiny={tiny} onClick={this.onCancel}>Cancel</Button>
          </div>
          <div className="pure-u-1-2 form-col">
            <Button theme={BUTTON_THEMES.DEFAULT_BLUE_INVERSE} tiny={tiny}>Send</Button>
          </div>
        </div>
      </form>
    );
  }

  render() {
    return this.renderForm();
  }
}

function mapStateToProps(state) {
  return {
    widget: state.getIn(['widgets', 'eWalletCreateInvoiceForm']),
  };
}

export default connect(mapStateToProps, { validateForm, clearFormErrors, triggerModal })(CreateInvoiceForm);
