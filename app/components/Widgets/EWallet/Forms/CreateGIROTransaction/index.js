import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { merge, pick } from 'lodash';
import { ActionSuccessMessage } from '../../Messages';
import BaseComponent from '../../../../../containers/Base';
import { TextInput, TEXT_INPUT_THEMES, Button, BUTTON_THEMES, SelectField, SELECT_FIELD_THEMES } from '../../../../UIKit';
import { validateForm, clearFormErrors } from '../../../../../actions/common';
import PURPOSES from '../../../../../constants/purposes';
import RULES from '../../../../../utils/validation/rules';
import BANKS from '../../../../../constants/banks';
import { triggerWalletCreateTransaction } from '../../../../../actions/wallet';
import { createTransaction, backToForm } from './actions';
import { VALIDATION_TYPES } from '../../../../../constants/common';
import styles from './styles.scss';

export class CreateGIROTransaction extends BaseComponent {
  static propTypes = {
    validateForm: PropTypes.func.isRequired,
    clearFormErrors: PropTypes.func.isRequired,
    triggerWalletCreateTransaction: PropTypes.func.isRequired,
    backToForm: PropTypes.func.isRequired,
    createTransaction: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { companyUEN: null, bankName: null, branchCode: null, bankAccountNumber: null, purpose: null, description: null, amount: null };
    this.onFormSubmit = ::this.onFormSubmit;
    this.onCancel = ::this.onCancel;
  }

  onFormSubmit(event) {
    const form = merge(pick(this.state, ['companyUEN', 'branchCode', 'bankAccountNumber', 'description', 'amount']), { purpose: (this.state.purpose || {}).label, bankName: (this.state.bankName || {}).label });
    const rules = { companyUEN: RULES.required, branchCode: RULES.required, bankAccountNumber: RULES.required, bankName: RULES.required, purpose: RULES.required, description: RULES.required, amount: RULES.greaterThenZero };
    event.preventDefault();
    this.props.validateForm({ form, rules, name: 'eWalletCreateGIROTransactionForm', type: VALIDATION_TYPES.WIDGET }, { onSuccess: () => { this.props.createTransaction(form); } });
  }

  onCancel() {
    this.props.clearFormErrors('eWalletCreateGIROTransactionForm', { type: VALIDATION_TYPES.WIDGET });
    this.props.triggerWalletCreateTransaction({ opened: false });
    this.props.backToForm();
  }

  renderForm() {
    const widget = this.props.widget.toJS();
    const tiny = true;
    const footerStyles = classNames('pure-g form-row', styles.formFooter);
    const [searchable, clearable, disabled] = [true, false, true];
    return (
      <div className={styles.form}>
        <form className="form" onSubmit={this.onFormSubmit}>
          <div className="form-row">
            <TextInput placeholder="Company UEN" onChange={this.onValueChange('companyUEN')} theme={TEXT_INPUT_THEMES.INTERNAL} error={widget.errors.companyUEN} />
          </div>
          <div className="form-row">
            <SelectField theme={SELECT_FIELD_THEMES.INTERNAL} options={BANKS} value={this.state.bankName} searchable={searchable} clearable={clearable} placeholder="Bank name" onChange={this.onValueChange('bankName')} error={widget.errors.bankName} />
          </div>
          <div className="form-row">
            <TextInput placeholder="Branch code" onChange={this.onValueChange('branchCode')} theme={TEXT_INPUT_THEMES.INTERNAL} error={widget.errors.branchCode} />
          </div>
          <div className="form-row">
            <TextInput placeholder="Bank account number" onChange={this.onValueChange('bankAccountNumber')} theme={TEXT_INPUT_THEMES.INTERNAL} error={widget.errors.bankAccountNumber} />
          </div>
          <div className="form-row">
            <SelectField theme={SELECT_FIELD_THEMES.INTERNAL} options={PURPOSES} value={this.state.purpose} searchable={searchable} clearable={clearable} placeholder="Purpose" onChange={this.onValueChange('purpose')} error={widget.errors.purpose} />
          </div>
          <div className="form-row">
            <TextInput placeholder="Description" onChange={this.onValueChange('description')} theme={TEXT_INPUT_THEMES.INTERNAL} error={widget.errors.description} />
          </div>
          <div className="form-row">
            <TextInput placeholder="Amount" onChange={this.onValueChange('amount')} mask="digits" theme={TEXT_INPUT_THEMES.INTERNAL} error={widget.errors.amount} />
          </div>
          <div className="form-row">
            <TextInput placeholder="Upload you file" disabled={disabled} mask="digits" theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
          <div className={footerStyles}>
            <div className="pure-u-1-2 form-col">
              <Button type="button" theme={BUTTON_THEMES.DEFAULT_GRAY_INVERSE} tiny={tiny} onClick={this.onCancel}>Cancel</Button>
            </div>
            <div className="pure-u-1-2 form-col">
              <Button theme={BUTTON_THEMES.DEFAULT_BLUE_INVERSE} tiny={tiny}>Send</Button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  render() {
    const widget = this.props.widget.toJS();
    const { transaction } = widget;
    if (transaction.completed) return <ActionSuccessMessage onClose={this.onCancel} />;
    return this.renderForm();
  }
}

function mapStateToProps(state) {
  return {
    widget: state.getIn(['widgets', 'eWalletCreateGIROTransactionForm']),
  };
}

export default connect(mapStateToProps, { validateForm, clearFormErrors, triggerWalletCreateTransaction, backToForm, createTransaction })(CreateGIROTransaction);
