import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import BaseComponent from '../../Base';
import { Button, TextInput } from '../../../components/UIKit';
import { InnerAppContainer } from '../../../components/Containers';
import { layoutUpdate, validateForm } from '../../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../../constants/common';
import { RULES } from '../../../utils/validation';
import styles from './styles.scss';

export class RegistrationPage extends BaseComponent {
  static propTypes = {
    layoutUpdate: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
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
    this.props.validateForm({ form, rules, name: 'login' }, { onSuccess: () => { alert('done'); } });
  }

  render() {
    const page = this.props.page.toJS();
    return (
      <InnerAppContainer>
        <Helmet title="Registaration Page" />
        <div className={styles.page}>
          <div className={styles.pageTitle}>Sign in</div>
          <form className={styles.pageForm} onSubmit={this.login}>
            <div className={styles.pageFormInput}>
              <TextInput type="text" label="USERNAME" onChange={this.onValueChange('username')} error={page.errors.username} />
            </div>
            <div className={styles.pageFormInput}>
              <TextInput type="password" label="PASSWORD" onChange={this.onValueChange('password')} error={page.errors.password} />
            </div>
            <div className={styles.pageFormButton}>
              <Button>Login</Button>
            </div>
          </form>
        </div>
      </InnerAppContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.getIn(['pages', 'registration']),
  };
}

export default connect(mapStateToProps, { layoutUpdate, validateForm })(RegistrationPage);
