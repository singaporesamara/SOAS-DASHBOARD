import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import { ROUTES } from '../../../constants/routes';
import NonAuthContainer, { FOOTER_LINKS } from '../NonAuthContainer';
import BaseComponent from '../../Base';
import { Button, TextInput } from '../../../components/UIKit';
import { layoutUpdate, validateForm } from '../../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../../constants/common';
import { RULES } from '../../../utils/validation';
import styles from './styles.scss';

export class ForgotPasswordPage extends BaseComponent {
  static propTypes = {
    layoutUpdate: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
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
    this.props.validateForm({ form, rules, name: 'forgotPassword' }, { onSuccess: () => { alert('done'); } });
  }

  render() {
    const links = merge({}, FOOTER_LINKS, { right: null, left: { title: 'Already have an account?', url: ROUTES.USER.LOGIN } });
    const page = this.props.page.toJS();
    return (
      <NonAuthContainer footerLinks={links}>
        <Helmet title="Login Page" />
        <div className={styles.page}>
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
      </NonAuthContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.getIn(['pages', 'forgotPassword']),
  };
}

export default connect(mapStateToProps, { layoutUpdate, validateForm })(ForgotPasswordPage);
