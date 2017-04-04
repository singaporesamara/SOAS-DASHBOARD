import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styles from './styles.scss';
import logo from '../../../assets/images/logo.png';

export class NonAuthContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    push: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.goToUrl = this.goToUrl.bind(this);
  }

  goToUrl(url) {
    return (event) => {
      event.preventDefault();
      this.props.push(url);
    };
  }

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.pageForm}>
          <div className={classNames('text-center', styles.pageFormLogo)}>
            <img className="image -logo" src={logo} alt="" />
          </div>
          {this.props.children}
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
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), { push })(NonAuthContainer);
