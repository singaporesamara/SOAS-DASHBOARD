import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { pick, merge } from 'lodash';
import { validateForm, clearFormErrors } from '../../../../../actions/common';
import { triggerWalletTopUp } from '../../../../../actions/wallet';
import { VALIDATION_TYPES } from '../../../../../constants/common';
import RULES from '../../../../../utils/validation/rules';
import BANKS from '../../../../../constants/banks';
import BaseComponent from '../../../../../containers/Base';
import { TextInput, TEXT_INPUT_THEMES, Button, BUTTON_THEMES, SelectField, SELECT_FIELD_THEMES } from '../../../../UIKit';
import { TransactionPending } from '../../Messages';
import { topUpByGIRO, backToForm } from './actions';
import styles from './styles.scss';

export class TopUpGIROForm extends BaseComponent {
  static propTypes = {
    widget: PropTypes.object.isRequired,
    validateForm: PropTypes.func.isRequired,
    clearFormErrors: PropTypes.func.isRequired,
    topUpByGIRO: PropTypes.func.isRequired,
    backToForm: PropTypes.func.isRequired,
    triggerWalletTopUp: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { bankAccountNumber: null, bankName: null, branchCode: null, amount: null };
    this.onFormSubmit = ::this.onFormSubmit;
    this.onClose = ::this.onClose;
  }

  onFormSubmit(event) {
    const form = merge(pick(this.state, ['bankAccountNumber', 'branchCode', 'amount']), { bankName: (this.state.bankName || {}).label });
    const rules = { bankAccountNumber: RULES.required, branchCode: RULES.required, bankName: RULES.required, amount: RULES.greaterThenZero };
    event.preventDefault();
    this.props.validateForm({ form, rules, name: 'eWalletTopUpGIROForm', type: VALIDATION_TYPES.WIDGET }, { onSuccess: () => { this.props.topUpByGIRO(form); } });
  }

  onClose() {
    this.props.clearFormErrors('eWalletTopUpGIROForm', { type: VALIDATION_TYPES.WIDGET });
    this.props.triggerWalletTopUp({ opened: false });
    this.props.backToForm();
  }

  renderForm() {
    const widget = this.props.widget.toJS();
    const [searchable, clearable] = [true, false];
    const footerStyles = classNames(styles.topUpFormFooter, 'form-row');
    return (
      <div className={styles.topUpForm}>
        <form className="form" onSubmit={this.onFormSubmit}>
          <div className="form-row">
            <TextInput placeholder="Bank account number" onChange={this.onValueChange('bankAccountNumber')} mask="digits" theme={TEXT_INPUT_THEMES.INTERNAL} error={widget.errors.bankAccountNumber} />
          </div>
          <div className="form-row">
            <SelectField theme={SELECT_FIELD_THEMES.INTERNAL} options={BANKS} value={this.state.bankName} searchable={searchable} clearable={clearable} placeholder="Bank name" onChange={this.onValueChange('bankName')} error={widget.errors.bankName} />
          </div>
          <div className="form-row">
            <TextInput placeholder="Branch code" onChange={this.onValueChange('branchCode')} mask="digits" theme={TEXT_INPUT_THEMES.INTERNAL} error={widget.errors.branchCode} />
          </div>
          <div className="form-row">
            <TextInput placeholder="Amount" onChange={this.onValueChange('amount')} mask="digits" theme={TEXT_INPUT_THEMES.INTERNAL} error={widget.errors.amount} />
          </div>
          <div className={footerStyles}>
            <div className={styles.topUpFormFooterButton}>
              <Button theme={BUTTON_THEMES.DEFAULT_BLUE_INVERSE}>Top up</Button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  render() {
    const widget = this.props.widget.toJS();
    const { transaction } = widget;
    if (transaction.completed) return <TransactionPending onClose={this.onClose} />;
    return this.renderForm();
  }
}

function mapStateToProps(state) {
  return {
    widget: state.getIn(['widgets', 'eWalletTopUpGIROForm']),
  };
}

export default connect(mapStateToProps, { validateForm, clearFormErrors, triggerWalletTopUp, topUpByGIRO, backToForm })(TopUpGIROForm);
