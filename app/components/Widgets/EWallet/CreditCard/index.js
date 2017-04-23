import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { TextInput, TEXT_INPUT_THEMES } from '../../../UIKit';
import styles from './styles.scss';
import visaIcon from '../../../../assets/images/icons/visa.svg';
import mcIcon from '../../../../assets/images/icons/master-card.svg';

export class CreditCardWidget extends Component {
  render() {
    const cardStyles = classNames(styles.creditCard, 'form');
    const iconsStyles = classNames(styles.cardIcons, 'text-right');
    return (
      <div className={cardStyles}>
        <div className={styles.card}>
          <div className={iconsStyles}>
            <img src={visaIcon} alt="Visa" />
            <img src={mcIcon} alt="MasterCard" />
          </div>
          <div className={styles.cardNumber}>
            <div className="pure-g form-row">
              <div className="pure-u-2-3 form-col">
                <TextInput placeholder="Card number" theme={TEXT_INPUT_THEMES.BORDERED} />
              </div>
            </div>
            <div className="pure-g form-row -tiny">
              <div className="pure-u-1-3 form-col">
                <TextInput placeholder="DD/MM" theme={TEXT_INPUT_THEMES.BORDERED} />
              </div>
              <div className="pure-u-1-3 form-col"></div>
              <div className="pure-u-1-3 form-col">
                <TextInput placeholder="CVC" theme={TEXT_INPUT_THEMES.BORDERED} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), {})(CreditCardWidget);
