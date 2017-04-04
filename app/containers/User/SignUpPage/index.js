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
import { signUp } from './actions';
import styles from './styles.scss';

export class SignUpPage extends BaseComponent {
  static propTypes = {
    layoutUpdate: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
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
    event.preventDefault();
    this.props.signUp({ email: this.state.email, password: this.state.password });
  }

  render() {
    const links = merge({}, FOOTER_LINKS, { left: { title: 'Already have an account?', url: ROUTES.USER.LOGIN } });
    return (
      <NonAuthContainer footerLinks={links}>
        <Helmet title="Login Page" />
        <div className={styles.page}>
          <div className={styles.pageTitle}>Sign Up</div>
          <form className={styles.pageForm} onSubmit={this.signUp}>
            <div className={styles.pageFormInput}>
              <TextInput type="email" label="EMAIL" onChange={this.onValueChange('email')} />
            </div>
            <div className={styles.pageFormInput}>
              <TextInput type="password" label="PASSWORD" onChange={this.onValueChange('password')} />
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

export default connect(() => ({}), { layoutUpdate, signUp })(SignUpPage);
