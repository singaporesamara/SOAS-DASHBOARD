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

export class ForgotPasswordPage extends BaseComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    layoutUpdate: PropTypes.func.isRequired,
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
    event.preventDefault();
    alert(`email = ${this.state.email}`);
  }

  render() {
    return (
      <NonAuthContainer>
        <Helmet title="Login Page" />
        <div className={styles.page}>
          <div className={styles.pageTitle}>Forgot password?</div>
          <form className={styles.pageForm} onSubmit={this.restorePassword}>
            <div className={styles.pageFormInput}>
              <TextInput type="email" label="EMAIL" onChange={this.onValueChange('email')} />
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

export default connect(() => ({}), { push, layoutUpdate })(ForgotPasswordPage);
