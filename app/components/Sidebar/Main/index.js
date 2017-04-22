import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './styles.scss';

export class MainSidebar extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props, context) { // eslint-disable-line no-useless-constructor
    super(props, context);
  }

  render() {
    const activeItem = classNames(styles.sidebarMenuItem, styles.sidebarMenuItemActive);
    return (
      <div className={styles.sidebar}>
        <div className={styles.sidebarMenu}>
          <div className={styles.sidebarMenuTitle}>
            Menu
          </div>
          <div>
            <ul className={styles.sidebarMenuItems}>
              <li className={activeItem}>
                Home
              </li>
              <li className={styles.sidebarMenuItem}>
                Invoices
              </li>
              <li className={styles.sidebarMenuItem}>
                Transactions
              </li>
              <li className={styles.sidebarMenuItem}>
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
