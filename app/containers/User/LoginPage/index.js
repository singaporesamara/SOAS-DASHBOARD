import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import NonAuthContainer from '../NonAuthContainer';
import BaseComponent from '../../Base';
import { Button, TextInput, TEXT_INPUT_THEMES, Notice } from '../../../components/UIKit';
import { layoutUpdate, validateForm } from '../../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../../constants/common';
import { RULES } from '../../../utils/validation';
import { login } from './actions';
import styles from './styles.scss';

export class LoginPage extends BaseComponent {
  static propTypes = {
    layoutUpdate: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { username: null, password: null };
    this.login = this.login.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  componentWillMount() {
    this.props.layoutUpdate(LAYOUT_NO_FOOTER);
  }

  login(event) {
    const form = { username: this.state.username, password: this.state.password };
    const rules = { username: RULES.email, password: RULES.required };
    event.preventDefault();
    this.props.validateForm({ form, rules, name: 'login' }, {
      onSuccess: () => {
        this.props.login({ email: this.state.username, password: this.state.password });
      },
    });
  }

  render() {
    const page = this.props.page.toJS();
    return (
      <NonAuthContainer>
        <Helmet title="Login Page" />
        <div className={styles.page}>
          <div className={styles.pageTitle}>Sign in</div>
          <form className={styles.pageForm} onSubmit={this.login}>
            <div className={styles.pageFormInput}>
              <Notice page="login" />
            </div>
            <div className={styles.pageFormInput}>
              <TextInput theme={TEXT_INPUT_THEMES.MATERIAL} type="text" label="USERNAME" onChange={this.onValueChange('username')} error={page.errors.username} />
            </div>
            <div className={styles.pageFormInput}>
              <TextInput theme={TEXT_INPUT_THEMES.MATERIAL} type="password" label="PASSWORD" onChange={this.onValueChange('password')} error={page.errors.password} />
            </div>
            <div className={styles.pageFormButton}>
              <Button>Login</Button>
            </div>
          </form>
        </div>
      </NonAuthContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.getIn(['pages', 'login']),
  };
}

export default connect(mapStateToProps, { layoutUpdate, validateForm, login })(LoginPage);
