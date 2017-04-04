import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import { restorePassword } from './actions';
import { ROUTES } from '../../../constants/routes';
import NonAuthContainer, { FOOTER_LINKS } from '../NonAuthContainer';
import BaseComponent from '../../Base';
import { Button, TextInput } from '../../../components/UIKit';
import { SuccessNotice } from '../../../components/UIKit/Notice';
import { layoutUpdate, validateForm } from '../../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../../constants/common';
import { RULES } from '../../../utils/validation';
import styles from './styles.scss';

export class ForgotPasswordPage extends BaseComponent {
  static propTypes = {
    layoutUpdate: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
    restorePassword: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { email: null };
    this.restorePassword = this.restorePassword.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  componentWillMount() {
    this.props.layoutUpdate(LAYOUT_NO_FOOTER);
  }

  restorePassword(event) {
    const form = { email: this.state.email };
    const rules = { username: RULES.email };
    event.preventDefault();
    this.props.validateForm({ form, rules, name: 'forgotPassword' }, { onSuccess: () => { this.props.restorePassword(form); } });
  }

  renderMessage() {
    const page = this.props.page.toJS();
    const message = 'Enter a work email address<br />ruzan.404@gmail.com looks like a personal email address.<br />If you want to be connected with your team, please use your work email address.';
    return page.show.message ? (
      <SuccessNotice message={message} />
    ) : null;
  }

  renderForm() {
    const page = this.props.page.toJS();
    return page.show.form ? (
      <div>
        <div className={styles.pageTitle}>Forgot password?</div>
        <form className={styles.pageForm} onSubmit={this.restorePassword}>
          <div className={styles.pageFormInput}>
            <TextInput type="email" label="EMAIL" onChange={this.onValueChange('email')} error={page.errors.email} />
          </div>
          <div className={styles.pageFormButton}>
            <Button>Restore password</Button>
          </div>
        </form>
      </div>
    ) : null;
  }

  render() {
    const links = merge({}, FOOTER_LINKS, { right: null, left: { title: 'Already have an account?', url: ROUTES.USER.LOGIN } });
    return (
      <NonAuthContainer footerLinks={links}>
        <Helmet title="Forgot Password" />
        <div className={styles.page}>
          {this.renderMessage()}
          {this.renderForm()}
        </div>
      </NonAuthContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.getIn(['pages', 'forgotPassword']),
  };
}

export default connect(mapStateToProps, { layoutUpdate, validateForm, restorePassword })(ForgotPasswordPage);
