import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import logo from '../../../assets/images/logo-sidebar.png';
import partnersIcon from '../../../assets/images/icons/sidebar/partners.svg';
import transactionsIcon from '../../../assets/images/icons/sidebar/transactions.svg';
import invoicesIcon from '../../../assets/images/icons/sidebar/invoices.svg';
import styles from './styles.scss';

export class MainSidebar extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props, context) { // eslint-disable-line no-useless-constructor
    super(props, context);
  }

  render() {
    const logoClass = classNames(styles.sidebarLogo, 'text-center');
    const activeItem = classNames(styles.sidebarMenuItem, styles.sidebarMenuItemActive);
    return (
      <div className={styles.sidebar}>
        <div className={logoClass}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.sidebarMenu}>
          <div className={styles.sidebarMenuTitle}>
            Menu
          </div>
          <div>
            <ul className={styles.sidebarMenuItems}>
              <li className={activeItem}>
                <div className={styles.sidebarMenuItemIcon}>
                  <img src={invoicesIcon} alt="Home" />
                </div>
                Home
              </li>
              <li className={styles.sidebarMenuItem}>
                <div className={styles.sidebarMenuItemIcon}>
                  <img src={invoicesIcon} alt="Invoices" />
                </div>
                Invoices
              </li>
              <li className={styles.sidebarMenuItem}>
                <div className={styles.sidebarMenuItemIcon}>
                  <img src={transactionsIcon} alt="Transactions" />
                </div>
                Transactions
              </li>
              <li className={styles.sidebarMenuItem}>
                <div className={styles.sidebarMenuItemIcon}>
                  <img src={partnersIcon} alt="Partners" />
                </div>
                Partners
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), {})(MainSidebar);
