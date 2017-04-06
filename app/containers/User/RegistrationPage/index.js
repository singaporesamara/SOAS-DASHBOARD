import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import classNames from 'classnames';
import BaseComponent from '../../Base';
import { InnerAppContainer } from '../../../components/Containers';
import { TextInput, Button } from '../../../components/UIKit';
import { layoutUpdate, validateForm } from '../../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../../constants/common';
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
        <div className={classNames('title -medium text -light', styles.pageTitle)}>Person registration</div>
        <div className={classNames('text -light', styles.pageDescription)}>Fixes an issue where the app—while being in the background—would sometimes prevent user notifications from showing up since the (messenger.com) app thought it was still active.</div>
        <div className={styles.pageForm}>
          <div className="form">
            <div className="pure-g form-row">
              <div className="pure-u-1-2 form-col">
                <TextInput type="text" label="Company Name" placeholder="Company Name" />
              </div>
              <div className="pure-u-1-2 form-col">
                <TextInput type="text" label="Company UEN" placeholder="Company UEN" />
              </div>
              {/* <!--/form-row--> */}
            </div>
          </div>
          <div className={classNames('title -section text -light', styles.pageSubTitle)}>Company Registered Address</div>
          <div className="form">
            <div className="pure-g form-row">
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Block/House number" placeholder="Block/House number" />
              </div>
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Street name" placeholder="Street name" />
              </div>
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Storey level" placeholder="Storey level" />
              </div>
            </div>
            {/* <!--/form-row--> */}
            <div className="pure-g form-row">
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Unit number" placeholder="00000000" />
              </div>
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Building Name" placeholder="Building Name" />
              </div>
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="City" placeholder="Singapore" />
              </div>
            </div>
            {/* <!--/form-row--> */}
            <div className="pure-g form-row">
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Country" placeholder="Singapore" />
              </div>
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Postal Code" placeholder="00000000" />
              </div>
            </div>
            {/* <!--/form-row--> */}
          </div>
          <div className="hr -spaced"></div>
          <div className="form">
            <div className="pure-g form-row">
              <div className="pure-u-1-3 form-col"></div>
              <div className="pure-u-1-3 form-col"></div>
              <div className="pure-u-1-3 form-col">
                <Button>Continue</Button>
              </div>
            </div>
          </div>
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
