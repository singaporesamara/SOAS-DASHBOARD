import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import { ROUTES } from '../../../constants/routes';
import NonAuthContainer, { FOOTER_LINKS } from '../NonAuthContainer';
import BaseComponent from '../../Base';
import { Button, TextInput, TEXT_INPUT_THEMES, SuccessNotice, Notice } from '../../../components/UIKit';
import { layoutUpdate, validateForm } from '../../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../../constants/common';
import { RULES } from '../../../utils/validation';
import { changePassword } from './actions';
import styles from './styles.scss';

export class ChangePasswordPage extends BaseComponent {
  static propTypes = {
    page: PropTypes.object.isRequired,
    checkword: PropTypes.string,
    layoutUpdate: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
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
    const form = { password: this.state.password, passwordConfirmation: this.state.passwordConfirmation };
    const rules = { password: RULES.required, passwordConfirmation: merge({}, RULES.required, RULES.equalsTo('password')) };
    event.preventDefault();
    this.props.validateForm({ form, rules, name: 'changePassword' }, { onSuccess: () => { this.props.changePassword({ password: this.state.password, checkword: this.props.checkword }); } });
  }

  renderMessage() {
    const page = this.props.page.toJS();
    const message = 'Your password was successfully changed!';
    return page.show.message ? (
      <SuccessNotice message={message} />
    ) : null;
  }

  renderForm() {
    const page = this.props.page.toJS();
    return page.show.form ? (
      <div>
        <div className={styles.pageTitle}>Change your password</div>
        <form className={styles.pageForm} onSubmit={this.restorePassword}>
          <div className={styles.pageFormInput}>
            <Notice page="changePassword" />
          </div>
          <div className={styles.pageFormInput}>
            <TextInput theme={TEXT_INPUT_THEMES.MATERIAL} type="password" label="PASSWORD" onChange={this.onValueChange('password')} error={page.errors.password} />
          </div>
          <div className={styles.pageFormInput}>
            <TextInput theme={TEXT_INPUT_THEMES.MATERIAL} type="password" label="PASSWORD CONFIRMATION" onChange={this.onValueChange('passwordConfirmation')} error={page.errors.passwordConfirmation} />
          </div>
          <div className={styles.pageFormButton}>
            <Button>Change password</Button>
          </div>
        </form>
      </div>
    ) : null;
  }

  render() {
    const links = merge({}, FOOTER_LINKS, { right: null, left: { title: 'Already have an account?', url: ROUTES.USER.LOGIN } });
    return (
      <NonAuthContainer footerLinks={links}>
        <Helmet title="Login Page" />
        <div className={styles.page}>
          {this.renderForm()}
          {this.renderMessage()}
        </div>
      </NonAuthContainer>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { router } = ownProps;
  const { checkword } = router.location.query;
  return {
    page: state.getIn(['pages', 'changePassword']),
    checkword,
  };
}

export default connect(mapStateToProps, { layoutUpdate, validateForm, changePassword })(ChangePasswordPage);
