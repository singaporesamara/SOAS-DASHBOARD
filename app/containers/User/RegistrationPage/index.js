import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import classNames from 'classnames';
import BaseComponent from '../../Base';
import { InnerAppContainer } from '../../../components/Containers';
import { TextInput, Button, BUTTON_THEMES } from '../../../components/UIKit';
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
    this.state = { step: PAGE_STEPS.BANK_ACCOUNT };
    this.onValueChange = this.onValueChange.bind(this);
    this.toStep = this.toStep.bind(this);
  }

  componentWillMount() {
    this.props.layoutUpdate(LAYOUT_NO_FOOTER);
  }

  toStep(step) {
    return (event) => {
      event.preventDefault();
      this.setState({ step });
    };
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
          {/* <!--/title--> */}
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
                <Button theme={BUTTON_THEMES.GREEN_SLIM} onClick={this.toStep(PAGE_STEPS.BANK_ACCOUNT)}>Continue</Button>
              </div>
            </div>
          </div>
          {/* <!--/buttons--> */}
        </div>
      </div>
    );
  }

  renderBankAccountStep() {
    return (
      <div>
        <div className={classNames('title -section text -light', styles.pageSectionTitle)}>Autorized Officer</div>
        {/* <!--/title--> */}
        <div className="form">
          <div className="pure-g form-row">
            <div className="pure-u-1-3 form-col">
              <TextInput type="text" label="Full Name" placeholder="Full Name" />
            </div>
            <div className="pure-u-1-3 form-col">
              <TextInput type="text" label="Mobile number" placeholder="+65" />
            </div>
            <div className="pure-u-1-3 form-col">
              <TextInput type="text" label="Email" placeholder="Email" />
            </div>
          </div>
          {/* <!--/form-row--> */}
          <div className="pure-g form-row">
            <div className="pure-u-1-2 form-col">
              <TextInput type="text" label="Foreign mailing address" placeholder="Foreign mailing address" />
              <div>
                Same with Company Registered address Bank Account Information
              </div>
            </div>
          </div>
          {/* <!--/form-row--> */}
        </div>
        <div className={classNames('title -section text -light', styles.pageSubTitle)}>Bank Account Information</div>
        {/* <!--/title--> */}
        <div className="form">
          <div className="pure-g form-row">
            <div className="pure-u-1-2 form-col">
              <TextInput type="text" label="Bank Name" placeholder="Bank Name" />
            </div>
            <div className="pure-u-1-2 form-col">
              <TextInput type="text" label="Branch Name" placeholder="Branch Name" />
            </div>
          </div>
          {/* <!--/form-row--> */}
          <div className="pure-g form-row">
            <div className="pure-u-1-2 form-col">
              <TextInput type="text" label="Bank Account Number" placeholder="00000000r" />
            </div>
            <div className="pure-u-1-2 form-col">
              <TextInput type="text" label="Confirm Bank account number" placeholder="00000000" />
            </div>
          </div>
          {/* <!--/form-row--> */}
          <div className="pure-g form-row">
            <div className="pure-u-1-2 form-col">
              <TextInput type="text" label="Bank Account Holder Name" placeholder="Bank Account Holder Name" />
            </div>
          </div>
          {/* <!--/form-row--> */}
        </div>
        <div className="hr -spaced"></div>
        <div className="form">
          <div className="pure-g form-row">
            <div className="pure-u-1-3 form-col">
              <Button theme={BUTTON_THEMES.GREEN_INVERSE_SLIM} onClick={this.toStep(PAGE_STEPS.GENERAL)}>Back</Button>
            </div>
            <div className="pure-u-1-3 form-col"></div>
            <div className="pure-u-1-3 form-col">
              <Button theme={BUTTON_THEMES.GREEN_SLIM}>Register</Button>
            </div>
          </div>
        </div>
        {/* <!--/buttons--> */}
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
          {this.state.step === PAGE_STEPS.BANK_ACCOUNT && this.renderBankAccountStep()}
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
