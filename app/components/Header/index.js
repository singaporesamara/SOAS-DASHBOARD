import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Wrapper } from '../UIKit';
import { ROUTES } from '../../constants/routes';
import styles from './styles.scss';
import logo from '../../assets/images/logo-inner.png';

export class Header extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    push: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onLogoClick = this.onLogoClick.bind(this);
  }

  onLogoClick(event) {
    event.preventDefault();
    this.props.push(ROUTES.HOME);
  }

  render() {
    return (
      <div className={styles.header}>
        <Wrapper>
          <a href={ROUTES.HOME} onClick={this.onLogoClick}>
            <img className={styles.headerLogo} src={logo} alt="logo" />
          </a>
        </Wrapper>
      </div>
    );
  }
}

export default connect(() => ({}), { push })(Header);
