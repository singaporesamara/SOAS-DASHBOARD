import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { pick } from 'lodash';
import { validateForm, clearFormErrors } from '../../../../../actions/common';
import { VALIDATION_TYPES } from '../../../../../constants/common';
import RULES from '../../../../../utils/validation/rules';
import BaseComponent from '../../../../../containers/Base';
import { TextInput, TEXT_INPUT_THEMES, Button, BUTTON_THEMES } from '../../../../UIKit';
import { triggerWalletCreateTransaction } from '../../../../../actions/wallet';
import styles from './styles.scss';

export class CreateTransactionForm extends BaseComponent {
  static propTypes = {
    widget: PropTypes.object.isRequired,
    validateForm: PropTypes.func.isRequired,
    triggerWalletCreateTransaction: PropTypes.func.isRequired,
    clearFormErrors: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { uen: null, purpose: null, description: null, amount: null };
    this.onFormSubmit = ::this.onFormSubmit;
    this.onValueChange = ::this.onValueChange;
    this.onCancel = ::this.onCancel;
  }

  onFormSubmit(event) {
    const form = pick(this.state, ['uen', 'purpose', 'description', 'amount']);
    const rules = { uen: RULES.required, purpose: RULES.required, description: RULES.required, amount: RULES.greaterThenZero };
    event.preventDefault();
    this.props.validateForm({ form, rules, name: 'eWalletCreateTransactionForm', type: VALIDATION_TYPES.WIDGET }, { onSuccess: () => { alert('hey..'); } });
  }

  onCancel(event) {
    event.preventDefault();
    this.props.clearFormErrors('eWalletCreateTransactionForm', { type: VALIDATION_TYPES.WIDGET });
    this.props.triggerWalletCreateTransaction({ opened: false });
  }

  render() {
    const widget = this.props.widget.toJS();
    const tiny = true;
    const footerStyles = classNames('pure-g form-row', styles.formFooter);
    return (
      <div className={styles.form}>
        <form className="form" onSubmit={this.onFormSubmit}>
          <div className="form-row">
            <TextInput placeholder="Email or UEN" onChange={this.onValueChange('uen')} theme={TEXT_INPUT_THEMES.INTERNAL} error={widget.errors.uen} />
          </div>
          <div className="form-row">
            <TextInput placeholder="Purpose" onChange={this.onValueChange('purpose')} theme={TEXT_INPUT_THEMES.INTERNAL} error={widget.errors.purpose} />
          </div>
          <div className="form-row">
            <TextInput placeholder="Description" onChange={this.onValueChange('description')} theme={TEXT_INPUT_THEMES.INTERNAL} error={widget.errors.description} />
          </div>
          <div className="form-row">
            <TextInput placeholder="Amount" onChange={this.onValueChange('amount')} mask="digits" theme={TEXT_INPUT_THEMES.INTERNAL} error={widget.errors.amount} />
          </div>
          <div className="form-row">
            <TextInput placeholder="Upload" mask="digits" theme={TEXT_INPUT_THEMES.INTERNAL} />
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
}

function mapStateToProps(state) {
  return {
    widget: state.getIn(['widgets', 'eWalletCreateTransactionForm']),
  };
}

export default connect(mapStateToProps, { validateForm, triggerWalletCreateTransaction, clearFormErrors })(CreateTransactionForm);
