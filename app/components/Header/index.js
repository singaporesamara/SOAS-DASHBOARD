import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import { Wrapper } from '../UIKit';
import { signOut } from '../../actions/user';
import { ROUTES } from '../../constants/routes';
import styles from './styles.scss';
import logo from '../../assets/images/logo-inner.png';

export class Header extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onLogoClick = this.onLogoClick.bind(this);
    this.onSignOutClick = this.onSignOutClick.bind(this);
  }

  onLogoClick(event) {
    event.preventDefault();
    this.props.push(ROUTES.HOME);
  }

  onSignOutClick(event) {
    event.preventDefault();
    this.props.signOut();
  }

  render() {
    const menuStyles = classNames('pure-u-1-2 text-right', styles.headerMenu);
    return (
      <div className={styles.header}>
        <Wrapper>
          <div className="pure-g">
            <div className="pure-u-1-2">
              <a href={ROUTES.HOME} onClick={this.onLogoClick}>
                <img className={styles.headerLogo} src={logo} alt="logo" />
              </a>
            </div>
            <div className={menuStyles}>
              <a href={ROUTES.USER.LOGIN} className="link -underline" onClick={this.onSignOutClick}>Sign Out</a>
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default connect(() => ({}), { push, signOut })(Header);
