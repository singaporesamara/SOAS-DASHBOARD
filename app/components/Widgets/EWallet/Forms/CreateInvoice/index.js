import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { pick, merge } from 'lodash';
import { validateForm, clearFormErrors, triggerModal } from '../../../../../actions/common';
import { VALIDATION_TYPES } from '../../../../../constants/common';
import { addInvoiceItem } from '../../../../../actions/invoices';
import RULES from '../../../../../utils/validation/rules';
import BaseComponent from '../../../../../containers/Base';
import { TextInput, TEXT_INPUT_THEMES, Button, BUTTON_THEMES, SelectField, SELECT_FIELD_THEMES } from '../../../../UIKit';
import { ActionSuccessMessage } from '../../Messages';
import styles from './styles.scss';

const GST_OPTIONS = [
  { label: 'No', value: false },
  { label: 'Yes', value: true },
];

export class CreateInvoiceForm extends BaseComponent {
  static propTypes = {
    triggerModal: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
    clearFormErrors: PropTypes.func.isRequired,
    addInvoiceItem: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { code: null, name: null, description: null, price: null, quantity: null, gst: null, total: null };
    this.onFormSubmit = ::this.onFormSubmit;
    this.onCancel = ::this.onCancel;
  }

  onFormSubmit(event) {
    const form = merge(pick(this.state, ['code', 'name', 'description', 'price', 'quantity']), { gst: (this.state.gst || {}).value });
    const rules = { code: RULES.required, name: RULES.required, description: RULES.required, price: RULES.greaterThenZero, quantity: RULES.greaterThenZero, gst: RULES.required };
    event.preventDefault();
    this.props.validateForm({ form, rules, name: 'eWalletCreateInvoiceForm', type: VALIDATION_TYPES.WIDGET }, { onSuccess: () => {
      this.props.addInvoiceItem(form);
      this.onCancel();
    }});
  }

  onCancel() {
    this.props.clearFormErrors('eWalletCreateInvoiceForm', { type: VALIDATION_TYPES.WIDGET });
    this.props.triggerModal('eWalletCreateInvoiceModal', { opened: false });
  }

  renderForm() {
    const widget = this.props.widget.toJS();
    const [tiny, searchable, clearable] = [true, false, false];
    const formStyles = classNames('form', styles.form);
    const formFooterStyles = classNames('form-footer -fixed -gray pure-g form-row', styles.formFooter);
    return (
      <form className={formStyles} onSubmit={this.onFormSubmit}>
        <div className="pure-g form-row">
          <div className="pure-u-1-1 form-col">
            <TextInput placeholder="Item code" onChange={this.onValueChange('code')} error={widget.errors.code} theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
        </div>

        <div className="pure-g form-row">
          <div className="pure-u-1-1 form-col">
            <TextInput placeholder="Item name" onChange={this.onValueChange('name')} error={widget.errors.name} theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
        </div>

        <div className="pure-g form-row">
          <div className="pure-u-1-1 form-col">
            <TextInput placeholder="Description" onChange={this.onValueChange('description')} error={widget.errors.description} theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
        </div>

        <div className="pure-g form-row">
          <div className="pure-u-1-1 form-col">
            <TextInput placeholder="Unit price" onChange={this.onValueChange('price')} mask="digits" error={widget.errors.price} theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
        </div>

        <div className="pure-g form-row">
          <div className="pure-u-1-1 form-col">
            <TextInput placeholder="Quantity" onChange={this.onValueChange('quantity')} mask="digits" error={widget.errors.quantity} theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
        </div>

        <div className="pure-g form-row">
          <div className="pure-u-1-1 form-col">
            <SelectField theme={SELECT_FIELD_THEMES.INTERNAL} options={GST_OPTIONS} value={this.state.gst} searchable={searchable} clearable={clearable} placeholder="GST" onChange={this.onValueChange('gst')} error={widget.errors.gst} />
          </div>
        </div>

        <div className={formFooterStyles}>
          <div className="pure-u-1-2 form-col -no-offset">
            <Button type="button" theme={BUTTON_THEMES.DEFAULT_GRAY_INVERSE} tiny={tiny} onClick={this.onCancel}>Cancel</Button>
          </div>
          <div className="pure-u-1-2 form-col">
            <Button theme={BUTTON_THEMES.DEFAULT_BLUE_INVERSE} tiny={tiny}>Add</Button>
          </div>
        </div>
      </form>
    );
  }

  render() {
    const { invoice } = this.props.widget.toJS();
    if (invoice.sent) return <ActionSuccessMessage message="Invoice was successfully sent" />;
    return this.renderForm();
  }
}

function mapStateToProps(state) {
  return {
    widget: state.getIn(['widgets', 'eWalletCreateInvoiceForm']),
  };
}

export default connect(mapStateToProps, { validateForm, addInvoiceItem, clearFormErrors, triggerModal })(CreateInvoiceForm);
