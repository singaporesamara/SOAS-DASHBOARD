import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import NonAuthContainer from '../NonAuthContainer';
import BaseComponent from '../../Base';
import { Button, TextInput } from '../../../components/UIKit';
import { layoutUpdate } from '../../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../../constants/common';
import styles from './styles.scss';

export class LoginPage extends BaseComponent {
  static propTypes = {
    layoutUpdate: PropTypes.func.isRequired,
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
    event.preventDefault();
    alert(`username = ${this.state.username}, password = ${this.state.password}`);
  }

  render() {
    return (
      <NonAuthContainer>
        <Helmet title="Login Page" />
        <div className={styles.page}>
          <div className={styles.pageTitle}>Sign in</div>
          <form className={styles.pageForm} onSubmit={this.login}>
            <div className={styles.pageFormInput}>
              <TextInput type="text" label="USERNAME" onChange={this.onValueChange('username')} />
            </div>
            <div className={styles.pageFormInput}>
              <TextInput type="password" label="PASSWORD" onChange={this.onValueChange('password')} />
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

export default connect(() => ({}), { layoutUpdate })(LoginPage);
