import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import { ROUTES } from '../../../constants/routes';
import NonAuthContainer, { FOOTER_LINKS } from '../NonAuthContainer';
import BaseComponent from '../../Base';
import { Button, TextInput, TEXT_INPUT_THEMES } from '../../../components/UIKit';
import { layoutUpdate, validateForm } from '../../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../../constants/common';
import { RULES } from '../../../utils/validation';
import { signUp } from './actions';
import styles from './styles.scss';

export class SignUpPage extends BaseComponent {
  static propTypes = {
    layoutUpdate: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { email: null, password: null };
    this.signUp = this.signUp.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  componentWillMount() {
    this.props.layoutUpdate(LAYOUT_NO_FOOTER);
  }

  signUp(event) {
    const form = { email: this.state.email, password: this.state.password };
    const rules = { username: RULES.email, password: RULES.required };
    event.preventDefault();
    this.props.validateForm({ form, rules, name: 'signUp' }, { onSuccess: () => { this.props.signUp(form); } });
  }

  render() {
    const links = merge({}, FOOTER_LINKS, { left: { title: 'Already have an account?', url: ROUTES.USER.LOGIN } });
    const page = this.props.page.toJS();
    return (
      <NonAuthContainer footerLinks={links}>
        <Helmet title="Login Page" />
        <div className={styles.page}>
          <div className={styles.pageTitle}>Sign Up</div>
          <form className={styles.pageForm} onSubmit={this.signUp}>
            <div className={styles.pageFormInput}>
              <TextInput theme={TEXT_INPUT_THEMES.MATERIAL} type="email" label="EMAIL" onChange={this.onValueChange('email')} error={page.errors.email} />
            </div>
            <div className={styles.pageFormInput}>
              <TextInput theme={TEXT_INPUT_THEMES.MATERIAL} type="password" label="PASSWORD" onChange={this.onValueChange('password')} error={page.errors.password} />
            </div>
            <div className={styles.pageFormButton}>
              <Button>Sign Up</Button>
            </div>
          </form>
        </div>
      </NonAuthContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.getIn(['pages', 'signUp']),
  };
}

export default connect(mapStateToProps, { layoutUpdate, signUp, validateForm })(SignUpPage);
