import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { pick, merge } from 'lodash';
import { ActionSuccessMessage } from '../../Messages';
import { validateForm, clearFormErrors } from '../../../../../actions/common';
import { VALIDATION_TYPES } from '../../../../../constants/common';
import RULES from '../../../../../utils/validation/rules';
import BaseComponent from '../../../../../containers/Base';
import { TextInput, TEXT_INPUT_THEMES, Button, BUTTON_THEMES, SelectField, SELECT_FIELD_THEMES } from '../../../../UIKit';
import { triggerWalletCreateTransaction } from '../../../../../actions/wallet';
import { createTransaction, backToForm } from './actions';
import PURPOSES from './purposes';
import styles from './styles.scss';

export class CreateTransactionForm extends BaseComponent {
  static propTypes = {
    widget: PropTypes.object.isRequired,
    validateForm: PropTypes.func.isRequired,
    triggerWalletCreateTransaction: PropTypes.func.isRequired,
    clearFormErrors: PropTypes.func.isRequired,
    createTransaction: PropTypes.func.isRequired,
    backToForm: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { emailOrUEN: null, purpose: null, description: null, amount: null };
    this.onFormSubmit = ::this.onFormSubmit;
    this.onValueChange = ::this.onValueChange;
    this.onCancel = ::this.onCancel;
    this.onClose = ::this.onClose;
  }

  onFormSubmit(event) {
    const form = merge(pick(this.state, ['emailOrUEN', 'description', 'amount']), { purpose: (this.state.purpose || {}).label });
    const rules = { emailOrUEN: RULES.required, purpose: RULES.required, description: RULES.required, amount: RULES.greaterThenZero };
    event.preventDefault();
    this.props.validateForm({ form, rules, name: 'eWalletCreateTransactionForm', type: VALIDATION_TYPES.WIDGET }, { onSuccess: () => { this.props.createTransaction(form); } });
  }

  onCancel(event) {
    event.preventDefault();
    this.onClose();
  }

  onClose() {
    this.props.clearFormErrors('eWalletCreateTransactionForm', { type: VALIDATION_TYPES.WIDGET });
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
            <TextInput placeholder="Email or UEN" onChange={this.onValueChange('emailOrUEN')} theme={TEXT_INPUT_THEMES.INTERNAL} error={widget.errors.emailOrUEN || widget.errors.tokenTo} />
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
            <div className={styles.formHidden}>
              <TextInput placeholder="Upload you file" disabled={disabled} mask="digits" theme={TEXT_INPUT_THEMES.INTERNAL} />
            </div>
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
    if (transaction.completed) return <ActionSuccessMessage onClose={this.onClose} />;
    return this.renderForm();
  }
}

function mapStateToProps(state) {
  return {
    widget: state.getIn(['widgets', 'eWalletCreateTransactionForm']),
  };
}

export default connect(mapStateToProps, { validateForm, triggerWalletCreateTransaction, clearFormErrors, createTransaction, backToForm })(CreateTransactionForm);
