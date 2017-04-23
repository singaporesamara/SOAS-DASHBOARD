import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { toMoneyString } from '../../../../../../utils/helpers';
import styles from './styles.scss';

export default class TransactionRow extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    event: PropTypes.object.isRequired,
  };

  render() {
    const { event } = this.props;
    const amountClass = classNames(styles.amount, { [styles.amountNegative]: event.amount < 0, [styles.amountPositive]: event.amount > 0 });
    return (
      <tr>
        <td className="-w10">{event.date}</td>
        <td className="-w20">{event.title}</td>
        <td className="-w15">
          <span className={amountClass}>{toMoneyString(event.amount, true)}</span>
        </td>
        <td className="-w15">{event.source}</td>
        <td className="-w40">{event.description}</td>
      </tr>
    );
  }
}
