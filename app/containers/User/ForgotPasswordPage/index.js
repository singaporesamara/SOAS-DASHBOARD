import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import { restorePassword } from './actions';
import { ROUTES } from '../../../constants/routes';
import NonAuthContainer, { FOOTER_LINKS } from '../NonAuthContainer';
import BaseComponent from '../../Base';
import { Button, TextInput, TEXT_INPUT_THEMES, Notice } from '../../../components/UIKit';
import { SuccessNotice } from '../../../components/UIKit/Notice';
import { layoutUpdate, validateForm } from '../../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../../constants/common';
import { RULES } from '../../../utils/validation';
import envelopeIcon from '../../../assets/images/icons/envelope.svg';
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
    const message = `We have successfully sent the email with password reset details. Please, visit <strong>${this.state.email}</strong> and follow the instructions.`;
    return page.show.message ? (
      <div className={styles.pageMessage}>
        <SuccessNotice message={message} icon={envelopeIcon} />
      </div>
    ) : null;
  }

  renderForm() {
    const page = this.props.page.toJS();
    return page.show.form ? (
      <div>
        <div className={styles.pageTitle}>Forgot password?</div>
        <form className={styles.pageForm} onSubmit={this.restorePassword}>
          <div className={styles.pageFormInput}>
            <Notice page="forgotPassword" />
          </div>
          <div className={styles.pageFormInput}>
            <TextInput theme={TEXT_INPUT_THEMES.MATERIAL} type="email" label="EMAIL" onChange={this.onValueChange('email')} error={page.errors.email} />
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
