import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { map } from 'lodash';
import { TYPES } from '../../../../constants/events';
import { SystemRow, TransactionRow, InvoiceRow } from './rows';
import styles from './styles.scss';
import refreshIcon from '../../../../assets/images/icons/refresh.svg';

export default class EventsTable extends Component {
  static propTypes = {
    onRefresh: PropTypes.func,
    events: PropTypes.array,
  };

  static defaultProps = {
    onRefresh: (event) => { event.preventDefault(); },
    events: [],
  };

  renderEvents() {
    return map(this.props.events, (event, index) => {
      if (event.type === TYPES.SYSTEM) {
        return <SystemRow key={index} event={event} />;
      } else if (event.type === TYPES.INVOICE) {
        return <InvoiceRow key={index} event={event} />;
      } else if (event.type === TYPES.TRANSACTION) {
        return <TransactionRow key={index} event={event} />;
      }
      return null;
    });
  }

  render() {
    const refreshStyles = classNames(styles.tableRefresh, 'text-right');
    return (
      <div className={styles.table}>
        <div className={refreshStyles}>
          <a href="/" className="link -gray -dotted" onClick={this.props.onRefresh}>
            <img src={refreshIcon} alt="Refresh" /> Refresh
          </a>
        </div>
        <div className={styles.tableWrapper}>
          <table className="table -default">
            <tbody>
              {this.renderEvents()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
