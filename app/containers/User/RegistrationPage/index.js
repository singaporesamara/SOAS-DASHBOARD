import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import classNames from 'classnames';
import BaseComponent from '../../Base';
import { InnerAppContainer } from '../../../components/Containers';
import { TextInput, Button, BUTTON_THEMES, SelectField, CheckboxGroup, Checkbox } from '../../../components/UIKit';
import { layoutUpdate, validateForm } from '../../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../../constants/common';
import { register } from './actions';
import { getProfileFields } from './utils';
import styles from './styles.scss';

const PAGE_STEPS = {
  GENERAL: 'general',
  BANK_ACCOUNT: 'bank-account',
};

const BANKS = [
  { label: 'Chase', value: 'chase' },
  { label: 'American Express', value: 'amex' },
];

export class RegistrationPage extends BaseComponent {
  static propTypes = {
    layoutUpdate: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { step: PAGE_STEPS.GENERAL, profile: getProfileFields() };
    this.onValueChange = this.onValueChange.bind(this);
    this.renderGeneralStep = this.renderGeneralStep.bind(this);
    this.renderBankAccountStep = this.renderBankAccountStep.bind(this);
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
    const disabled = true;
    return (
      <div>
        <div className={classNames('title -medium text -light', styles.pageTitle)}>Person registration</div>
        <div className={classNames('text -light', styles.pageDescription)}>Fixes an issue where the app—while being in the background—would sometimes prevent user notifications from showing up since the (messenger.com) app thought it was still active.</div>
        <div className={styles.pageForm}>
          <div className="form">
            <div className="pure-g form-row">
              <div className="pure-u-1-2 form-col">
                <TextInput type="text" label="Company Name" placeholder="Company Name" onChange={this.onValueChange('companyName')} />
              </div>
              <div className="pure-u-1-2 form-col">
                <TextInput type="text" label="Company UEN" placeholder="Company UEN" onChange={this.onValueChange('companyUEN')} />
              </div>
              {/* <!--/form-row--> */}
            </div>
          </div>
          <div className={classNames('title -section text -light', styles.pageSubTitle)}>Company Registered Address</div>
          {/* <!--/title--> */}
          <div className="form">
            <div className="pure-g form-row">
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Block/House number" placeholder="Block/House number" onChange={this.onValueChange('houseNumber')} />
              </div>
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Street name" placeholder="Street name" onChange={this.onValueChange('streetName')} />
              </div>
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Storey level" placeholder="Storey level" onChange={this.onValueChange('storeyLevel')} />
              </div>
            </div>
            {/* <!--/form-row--> */}
            <div className="pure-g form-row">
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Unit number" placeholder="00000000" onChange={this.onValueChange('unitNumber')} />
              </div>
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Building Name" placeholder="Building Name" onChange={this.onValueChange('buildingName')} />
              </div>
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="City" value={this.state.city} disabled={disabled} placeholder="Singapore" />
              </div>
            </div>
            {/* <!--/form-row--> */}
            <div className="pure-g form-row">
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Country" value={this.state.country} disabled={disabled} placeholder="Singapore" />
              </div>
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Postal Code" placeholder="00000000" onChange={this.onValueChange('postalCode')} />
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
              <TextInput type="text" label="Full Name" placeholder="Full Name" onChange={this.onValueChange('officerFullName')} />
            </div>
            <div className="pure-u-1-3 form-col">
              <TextInput type="text" label="Mobile number" placeholder="+65" onChange={this.onValueChange('mobileNumber')} />
            </div>
            <div className="pure-u-1-3 form-col">
              <TextInput type="text" label="Email" placeholder="Email" onChange={this.onValueChange('email')} />
            </div>
          </div>
          {/* <!--/form-row--> */}
          <div className="pure-g form-row">
            <div className="pure-u-1-2 form-col">
              <TextInput type="text" label="Foreign mailing address" placeholder="Foreign mailing address" onChange={this.onValueChange('foreignMailingAddress')} />
              <div className={styles.pageSectionInputInfo}>
                <CheckboxGroup name="checkbox-name" value={[this.state.sameWithCompanyInfo]} onChange={this.onValueChange('sameWithCompanyInfo')}>
                  <Checkbox value="true" label="Same with Company Registered address Bank Account Information" />
                </CheckboxGroup>
              </div>
            </div>
            <div className="pure-u-1-2 form-col"></div>
          </div>
          {/* <!--/form-row--> */}
        </div>
        <div className={classNames('title -section text -light', styles.pageSubTitle)}>Bank Account Information</div>
        {/* <!--/title--> */}
        <div className="form">
          <div className="pure-g form-row">
            <div className="pure-u-1-2 form-col">
              <SelectField options={BANKS} value={this.state.bankName} label="Bank Name" placeholder="Bank Name" onChange={this.onValueChange('bankName')} />
            </div>
            <div className="pure-u-1-2 form-col">
              <TextInput type="text" label="Branch Name" placeholder="Branch Name" onChange={this.onValueChange('branchName')} />
            </div>
          </div>
          {/* <!--/form-row--> */}
          <div className="pure-g form-row">
            <div className="pure-u-1-2 form-col">
              <TextInput type="text" label="Bank Account Number" placeholder="00000000" onChange={this.onValueChange('bankAccountNumber')} />
            </div>
            <div className="pure-u-1-2 form-col">
              <TextInput type="text" label="Confirm Bank account number" placeholder="00000000" onChange={this.onValueChange('bankAccountNumberConfirmation')} />
            </div>
          </div>
          {/* <!--/form-row--> */}
          <div className="pure-g form-row">
            <div className="pure-u-1-2 form-col">
              <TextInput type="text" label="Bank Account Holder Name" placeholder="Bank Account Holder Name" onChange={this.onValueChange('bankAccountHolderName')} />
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

export default connect(mapStateToProps, { layoutUpdate, validateForm, register })(RegistrationPage);
