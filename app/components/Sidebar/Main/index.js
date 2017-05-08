import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import { ROUTES } from '../../../constants/routes';
import { signOut } from '../../../actions/user';
import { triggerWalletCreateTransaction } from '../../../actions/wallet';
import { triggerModal } from '../../../actions/common';
import styles from './styles.scss';

export class MainSidebar extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    triggerWalletCreateTransaction: PropTypes.func.isRequired,
    triggerModal: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onLogOut = ::this.onLogOut;
    this.onCreateTransaction = ::this.onCreateTransaction;
    this.openModal = ::this.openModal;
    this.goTo = ::this.goTo;
  }

  onLogOut(event) {
    event.preventDefault();
    this.props.signOut();
  }

  onCreateTransaction(event) {
    event.preventDefault();
    this.props.triggerWalletCreateTransaction({ opened: true });
  }

  openModal(name) {
    return (event) => {
      event.preventDefault();
      this.props.triggerModal(name, { opened: true });
    };
  }

  goTo(url) {
    return (event) => {
      event.preventDefault();
      this.props.push(url);
    };
  }

  render() {
    const activeItem = classNames(styles.sidebarMenuItem, styles.sidebarMenuItemActive);
    const tinyItem = classNames(styles.sidebarMenuItem, styles.sidebarMenuItemTiny);
    return (
      <div className={styles.sidebar}>
        <div className={styles.sidebarMenu}>
          <div>
            <ul className={styles.sidebarMenuItems}>
              <li className={styles.sidebarMenuItemsGroup}>
                <ul>
                  <li className={activeItem}>
                    <div className={styles.sidebarMenuItemTitle}>
                      <a href={ROUTES.APP.HOME} className="link" onClick={this.goTo(ROUTES.APP.HOME)}>Payments</a>
                    </div>
                    <ul>
                      <li>
                        <a href="/create-transaction" className="link" onClick={this.onCreateTransaction}>Create Transaction</a>
                      </li>
                      <li>
                        <a href={ROUTES.APP.INVOICES.CREATE} className="link" onClick={this.goTo(ROUTES.APP.INVOICES.CREATE)}>Send invoice</a>
                      </li>
                      <li>Payout</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className={styles.sidebarMenuItemsGroup}>
                <ul>
                  <li className={styles.sidebarMenuItem}>
                    <div className={styles.sidebarMenuItemTitle}>Analytics</div>
                  </li>
                  <li className={styles.sidebarMenuItem}>
                    <div className={styles.sidebarMenuItemTitle}>Documents</div>
                  </li>
                  <li className={styles.sidebarMenuItem}>
                    <div className={styles.sidebarMenuItemTitle}>Partners</div>
                  </li>
                </ul>
              </li>
              <li className={styles.sidebarMenuItemsGroup}>
                <ul>
                  <li className={styles.sidebarMenuItem}>
                    <div className={styles.sidebarMenuItemTitle}>Services</div>
                  </li>
                  <li className={styles.sidebarMenuItem}>
                    <div className={styles.sidebarMenuItemTitle}>Support</div>
                  </li>
                </ul>
              </li>
              <li className={styles.sidebarMenuItemsGroup}>
                <ul>
                  <li className={tinyItem}>
                    <div className={styles.sidebarMenuItemTitle}>Settings</div>
                  </li>
                  <li className={tinyItem}>
                    <div className={styles.sidebarMenuItemTitle}>
                      <a href="/sign-out" className="link" onClick={this.onLogOut}>Log Out</a>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), { push, signOut, triggerWalletCreateTransaction, triggerModal })(MainSidebar);
