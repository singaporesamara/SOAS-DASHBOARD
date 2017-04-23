import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { pick } from 'lodash';
import BaseComponent from '../../../../containers/Base';
import { TextInput, TEXT_INPUT_THEMES, Button, BUTTON_THEMES } from '../../../UIKit';
import { validateForm } from '../../../../actions/common';
import { VALIDATION_TYPES } from '../../../../constants/common';
import RULES from '../../../../utils/validation/rules';
import { topUp } from './actions';
import styles from './styles.scss';
import visaIcon from '../../../../assets/images/icons/visa.svg';
import mcIcon from '../../../../assets/images/icons/master-card.svg';

export class CreditCardWidget extends BaseComponent {
  static propTypes = {
    widget: PropTypes.object.isRequired,
    topUp: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { number: null, expirationDate: null, cvc: null, amount: null };
    this.onFormSubmit = ::this.onFormSubmit;
    this.onValueChange = ::this.onValueChange;
  }

  onFormSubmit(event) {
    const form = pick(this.state, ['number', 'expirationDate', 'cvc', 'amount']);
    const rules = { number: RULES.required, expirationDate: RULES.required, cvc: RULES.cvc, amount: RULES.greaterThenZero };
    event.preventDefault();
    this.props.validateForm({ form, rules, name: 'eWalletCreditCard', type: VALIDATION_TYPES.WIDGET }, { onSuccess: () => { this.props.topUp(form); } });
  }

  render() {
    const iconsStyles = classNames(styles.cardIcons, 'text-right');
    const widget = this.props.widget.toJS();
    return (
      <div className={styles.creditCard}>
        <form className="form" onSubmit={this.onFormSubmit}>
          <div className={styles.card}>
            <div className={iconsStyles}>
              <img src={visaIcon} alt="Visa" />
              <img src={mcIcon} alt="MasterCard" />
            </div>
            <div className={styles.cardNumber}>
              <div className="pure-g form-row">
                <div className="pure-u-2-3 form-col">
                  <TextInput placeholder="Card number" onChange={this.onValueChange('number')} error={widget.errors.number} mask="creditCard" theme={TEXT_INPUT_THEMES.BORDERED} />
                </div>
              </div>
              <div className="pure-g form-row -tiny">
                <div className="pure-u-1-4 form-col">
                  <TextInput placeholder="DD/MM" onChange={this.onValueChange('expirationDate')} error={widget.errors.expirationDate} mask="expirationDateShortYear" theme={TEXT_INPUT_THEMES.BORDERED} />
                </div>
                <div className="pure-u-1-2 form-col"></div>
                <div className="pure-u-1-4 form-col text-right">
                  <div className={styles.cardCVC}>
                    <TextInput placeholder="CVC" onChange={this.onValueChange('cvc')} error={widget.errors.cvc} mask="cvc" theme={TEXT_INPUT_THEMES.BORDERED} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.creditCardAmount}>
            <div className={styles.creditCardAmountField}>
              <TextInput placeholder="Amount" onChange={this.onValueChange('amount')} error={widget.errors.amount} mask="digits" theme={TEXT_INPUT_THEMES.BORDERED} />
            </div>
          </div>
          <div className={styles.creditCardButton}>
            <div className={styles.creditCardButtonWrapper}>
              <Button theme={BUTTON_THEMES.DEFAULT_BLUE_INVERSE}>Top up</Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    widget: state.getIn(['widgets', 'eWalletCreditCard']),
  };
}

export default connect(mapStateToProps, { topUp, validateForm })(CreditCardWidget);
