import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styles from './styles.scss';
import logo from '../../../assets/images/logo.png';
import { ROUTES } from '../../../constants/routes';

export const FOOTER_LINKS = {
  left: {
    url: ROUTES.USER.SIGN_UP,
    title: 'Don’t have an account?',
  },
  right: {
    url: ROUTES.USER.FORGOT_PASSWORD,
    title: 'Forgot password?',
  },
};

export class NonAuthContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    push: PropTypes.func.isRequired,
    footerLinks: PropTypes.object,
  };

  static defaultProps = {
    footerLinks: FOOTER_LINKS,
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

  renderFooter() {
    const links = this.props.footerLinks;
    return (
      <div className="pure-g">
        {links.left && <div className="pure-u-1-3 text-left">
          <a href={links.left.url} className="link -underline" onClick={this.goToUrl(links.left.url)}>{links.left.title}</a>
        </div>}
        <div className="pure-u-1-3 text-center">
          <a href={ROUTES.HOME} className="link" onClick={this.goToUrl(ROUTES.HOME)}>English</a>
        </div>
        {links.right && <div className="pure-u-1-3 text-right">
          <a href={links.right.url} className="link -underline" onClick={this.goToUrl(links.right.url)}>{links.right.title}</a>
        </div>}
      </div>
    );
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
            {this.renderFooter()}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), { push })(NonAuthContainer);
