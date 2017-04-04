import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import { ROUTES } from '../../../constants/routes';
import NonAuthContainer, { FOOTER_LINKS } from '../NonAuthContainer';
import BaseComponent from '../../Base';
import { Button, TextInput } from '../../../components/UIKit';
import { layoutUpdate } from '../../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../../constants/common';
import styles from './styles.scss';

export class restorePasswordPage extends BaseComponent {
  static propTypes = {
    layoutUpdate: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { password: null, passwordConfirmation: null };
    this.restorePassword = this.restorePassword.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  componentWillMount() {
    this.props.layoutUpdate(LAYOUT_NO_FOOTER);
  }

  restorePassword(event) {
    event.preventDefault();
    alert(`password = ${this.state.password}, password confirmation = ${this.state.passwordConfirmation}`);
  }

  render() {
    const links = merge({}, FOOTER_LINKS, { right: null, left: { title: 'Already have an account?', url: ROUTES.USER.LOGIN } });
    return (
      <NonAuthContainer footerLinks={links}>
        <Helmet title="Login Page" />
        <div className={styles.page}>
          <div className={styles.pageTitle}>Change your password</div>
          <form className={styles.pageForm} onSubmit={this.restorePassword}>
            <div className={styles.pageFormInput}>
              <TextInput type="email" label="PASSWORD" onChange={this.onValueChange('password')} />
            </div>
            <div className={styles.pageFormInput}>
              <TextInput type="email" label="PASSWORD CONFIRMATION" onChange={this.onValueChange('passwordConfirmation')} />
            </div>
            <div className={styles.pageFormButton}>
              <Button>Change password</Button>
            </div>
          </form>
        </div>
      </NonAuthContainer>
    );
  }
}

export default connect(() => ({}), { layoutUpdate })(restorePasswordPage);
