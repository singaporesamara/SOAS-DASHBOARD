import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { signOut } from '../../../actions/user';
import styles from './styles.scss';

export class MainSidebar extends Component {
  static propTypes = {
    signOut: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onLogOut = ::this.onLogOut;
  }

  onLogOut(event) {
    event.preventDefault();
    this.props.signOut();
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
                    <div>Payments</div>
                    <ul>
                      <li>Create Transaction</li>
                      <li>Send invoice</li>
                      <li>Payout</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className={styles.sidebarMenuItemsGroup}>
                <ul>
                  <li className={styles.sidebarMenuItem}>
                    <div>Analytics</div>
                  </li>
                  <li className={styles.sidebarMenuItem}>
                    <div>Documents</div>
                  </li>
                  <li className={styles.sidebarMenuItem}>
                    <div>Partners</div>
                  </li>
                </ul>
              </li>
              <li className={styles.sidebarMenuItemsGroup}>
                <ul>
                  <li className={styles.sidebarMenuItem}>
                    <div>Services</div>
                  </li>
                  <li className={styles.sidebarMenuItem}>
                    <div>Support</div>
                  </li>
                </ul>
              </li>
              <li className={styles.sidebarMenuItemsGroup}>
                <ul>
                  <li className={tinyItem}>
                    <div>Settings</div>
                  </li>
                  <li className={tinyItem}>
                    <div>
                      <a href className="link" onClick={this.onLogOut}>Log Out</a>
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

export default connect(() => ({}), { signOut })(MainSidebar);
