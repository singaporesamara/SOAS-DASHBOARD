import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import className from 'classnames';
import BaseComponent from '../../Base';
import { InnerAppContainer } from '../../../components/Containers';
import { layoutUpdate, validateForm } from '../../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../../constants/common';
import { RULES } from '../../../utils/validation';
import styles from './styles.scss';

const PAGE_STEPS = {
  GENERAL: 'general',
  BANK_ACCOUNT: 'bank-account',
};

export class RegistrationPage extends BaseComponent {
  static propTypes = {
    layoutUpdate: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { step: PAGE_STEPS.GENERAL };
    this.onValueChange = this.onValueChange.bind(this);
  }

  componentWillMount() {
    this.props.layoutUpdate(LAYOUT_NO_FOOTER);
  }

  renderGeneralStep() {
    return (
      <div>
        <div className={className('title -medium text -light', styles.pageTitle)}>Person registration</div>
        <div className={className('text -light', styles.pageDescription)}>Fixes an issue where the app—while being in the background—would sometimes prevent user notifications from showing up since the (messenger.com) app thought it was still active.</div>
        <div className={styles.pageForm}>
          <div>Form...</div>
          <div className="hr -spaced"></div>
          <div>Buttons...</div>
        </div>
      </div>
    );
  }

  render() {
    // const page = this.props.page.toJS();
    return (
      <InnerAppContainer>
        <Helmet title="Registaration Page" />
        <div className={styles.page}>
          {this.state.step === PAGE_STEPS.GENERAL && this.renderGeneralStep()}
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
