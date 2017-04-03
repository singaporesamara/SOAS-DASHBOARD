import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styles from './styles.scss';

export class LoginPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {};

  render() {
    return (
      <div className={styles.page}>
        <Helmet title="Login Page" />
        <div className={styles.pageForm}>
          <div className={styles.pageFormTitle}>
            Sign in
          </div>
          <div>
            <div>
              <input type="text" placeholder="USERNAME" />
            </div>
            <div>
              <input type="text" placeholder="PASSWORD" />
            </div>
            <div>
              <button>Login</button>
            </div>
            <div className={styles.pageFormHelp}>
              <div className="pure-g">
                <div className="pure-u-1-3 text-left">
                  <div>Don’t have an account?</div>
                </div>
                <div className="pure-u-1-3 text-center">
                  <div>English</div>
                </div>
                <div className="pure-u-1-3 text-right">
                  <div>Forgot password?</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), { push })(LoginPage);
