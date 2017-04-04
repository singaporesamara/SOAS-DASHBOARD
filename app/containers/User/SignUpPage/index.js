import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import NonAuthContainer from '../NonAuthContainer';
import BaseComponent from '../../Base';
import { Button, TextInput } from '../../../components/UIKit';
import { layoutUpdate } from '../../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../../constants/common';
import styles from './styles.scss';

export class SignUpPage extends BaseComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    layoutUpdate: PropTypes.func.isRequired,
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
    alert(`email = ${this.state.email}, password = ${this.state.password}`);
  }

  render() {
    return (
      <NonAuthContainer>
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

export default connect(() => ({}), { push, layoutUpdate })(SignUpPage);
