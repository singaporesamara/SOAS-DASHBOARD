import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { TextInput, TEXT_INPUT_THEMES, Button, BUTTON_THEMES } from '../../../UIKit';
import styles from './styles.scss';
import visaIcon from '../../../../assets/images/icons/visa.svg';
import mcIcon from '../../../../assets/images/icons/master-card.svg';

export class CreditCardWidget extends Component {
  constructor(props, context) {
    super(props, context);
    this.onFormSubmit = ::this.onFormSubmit;
  }

  onFormSubmit(event) {
    event.preventDefault();
    alert('Submitted...');
  }

  render() {
    const iconsStyles = classNames(styles.cardIcons, 'text-right');
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
                  <TextInput placeholder="Card number" mask="creditCard" theme={TEXT_INPUT_THEMES.BORDERED} />
                </div>
              </div>
              <div className="pure-g form-row -tiny">
                <div className="pure-u-1-4 form-col">
                  <TextInput placeholder="DD/MM" mask="expirationDateShortYear" theme={TEXT_INPUT_THEMES.BORDERED} />
                </div>
                <div className="pure-u-1-2 form-col"></div>
                <div className="pure-u-1-4 form-col text-right">
                  <div className={styles.cardCVC}>
                    <TextInput placeholder="CVC" mask="cvc" theme={TEXT_INPUT_THEMES.BORDERED} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.creditCardAmount}>
            <div className={styles.creditCardAmountField}>
              <TextInput placeholder="Amount" mask="digits" theme={TEXT_INPUT_THEMES.BORDERED} />
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

export default connect(() => ({}), {})(CreditCardWidget);
