import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import { Button, TextInput } from '../../../components/UIKit';
import styles from './styles.scss';
import logo from '../../../assets/images/logo.png';

export class LoginPage extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.goToUrl = this.goToUrl.bind(this);
    this.login = this.login.bind(this);
  }

  goToUrl(url) {
    return (event) => {
      event.preventDefault();
      this.props.push(url);
    };
  }

  login(event) {
    event.preventDefault();
    alert('submit here..');
  }

  render() {
    return (
      <div className={styles.page}>
        <Helmet title="Login Page" />
        <div className={styles.pageForm}>
          <div className={classNames('text-center', styles.pageFormLogo)}>
            <img className="image -logo" src={logo} alt="" />
          </div>
          <div className={styles.pageFormTitle}>
            Sign in
          </div>
          <form className={styles.pageFormContainer} onSubmit={this.login}>
            <div className={styles.pageFormInput}>
              <TextInput type="text" label="USERNAME" />
            </div>
            <div className={styles.pageFormInput}>
              <TextInput type="password" label="PASSWORD" />
            </div>
            <div className={styles.pageFormButton}>
              <Button>Login</Button>
            </div>
            <div className={styles.pageFormHelp}>
              <div className="pure-g">
                <div className="pure-u-1-3 text-left">
                  <a href="/sign-up" className="link -underline" onClick={this.goToUrl('/sign-up')}>Don’t have an account?</a>
                </div>
                <div className="pure-u-1-3 text-center">
                  <a href="/" className="link" onClick={this.goToUrl('/')}>English</a>
                </div>
                <div className="pure-u-1-3 text-right">
                  <a href="/forgot-password" className="link -underline" onClick={this.goToUrl('/forgot-password')}>Forgot password?</a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), { push })(LoginPage);
