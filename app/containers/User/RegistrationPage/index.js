import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import { merge, pick, omit, values } from 'lodash';
import BaseComponent from '../../Base';
import { InnerAppContainer } from '../../../components/Containers';
import { TextInput, Button, BUTTON_THEMES, SelectField, CheckboxGroup, Checkbox, SuccessNotice, Notice } from '../../../components/UIKit';
import { layoutUpdate, validateForm, loadPage } from '../../../actions/common';
import { getProfile } from '../../../actions/user';
import { LAYOUT_NO_FOOTER } from '../../../constants/common';
import { ROUTES } from '../../../constants/routes';
import BANKS from '../../../constants/banks';
import { register } from './actions';
import { getProfileFields, generalFormValidationRules, bankAccountFormValidationRules } from './helpers';
import styles from './styles.scss';

const PAGE_STEPS = {
  GENERAL: 'general',
  BANK_ACCOUNT: 'bank-account',
};

export class RegistrationPage extends BaseComponent {
  static propTypes = {
    layoutUpdate: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    loadPage: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = merge({ step: PAGE_STEPS.GENERAL, disabled: { foreignMailingAddress: false } }, getProfileFields());
    this.onValueChange = this.onValueChange.bind(this);
    this.renderGeneralStep = this.renderGeneralStep.bind(this);
    this.renderBankAccountStep = this.renderBankAccountStep.bind(this);
    this.toStep = this.toStep.bind(this);
    this.submitGeneralForm = this.submitGeneralForm.bind(this);
    this.submitBankAccountForm = this.submitBankAccountForm.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.toHomePage = this.toHomePage.bind(this);
    this.onSameAddressChange = this.onSameAddressChange.bind(this);
    this.checkStoreyLevel = this.checkStoreyLevel.bind(this);
  }

  componentWillMount() {
    this.props.layoutUpdate(LAYOUT_NO_FOOTER);
    this.props.loadPage('registration');
  }

  onSameAddressChange(data) {
    const sameWithCompanyInfo = data[1];
    this.setState({ sameWithCompanyInfo });

    if (sameWithCompanyInfo) {
      const fullAddress = values(pick(this.state, ['buildingName', 'streetName', 'houseNumber', 'storeyLevel', 'unitNumber', 'postalCode'])).join(', ');
      const address = `Singapore, ${fullAddress}`;
      this.setState({ foreignMailingAddress: address, disabled: { foreignMailingAddress: true } });
    } else {
      this.setState({ foreignMailingAddress: '', disabled: { foreignMailingAddress: false } });
    }
  }

  checkStoreyLevel(event) {
    const { value } = event.target;
    if (value && value.length > 0 && value.length < 2) {
      this.setState({ storeyLevel: `0${value}` });
    }
  }

  toStep(step) {
    return (event) => {
      event.preventDefault();
      this.setState({ step });
    };
  }

  toHomePage(event) {
    event.preventDefault();
    this.props.push(ROUTES.APP.HOME);
  }

  submitGeneralForm(event) {
    const { fields, rules } = generalFormValidationRules();
    const form = pick(this.state, fields);
    event.preventDefault();
    this.props.validateForm({ form, rules, name: 'registration' }, { onSuccess: () => { this.toStep(PAGE_STEPS.BANK_ACCOUNT)(event); } });
  }

  submitBankAccountForm(event) {
    const { fields, rules } = bankAccountFormValidationRules();
    const form = pick(this.state, fields);
    event.preventDefault();
    this.props.validateForm({ form, rules, name: 'registration' }, { onSuccess: () => { this.props.register(omit(this.state, ['step', 'disabled'])); } });
  }

  renderGeneralStep() {
    const page = this.props.page.toJS();
    const disabled = true;
    return (
      <div>
        <div className={classNames('title -medium text -light', styles.pageTitle)}>Person registration</div>
        <div className={classNames('text -light', styles.pageDescription)}>Fixes an issue where the app—while being in the background—would sometimes prevent user notifications from showing up since the (messenger.com) app thought it was still active.</div>
        <form className={styles.pageForm} onSubmit={this.submitGeneralForm}>
          <div className="form">
            <div className="pure-g form-row">
              <div className="pure-u-1-2 form-col">
                <TextInput type="text" label="Company Name" placeholder="Company Name" value={this.state.companyName} onChange={this.onValueChange('companyName')} error={page.errors.companyName} />
              </div>
              <div className="pure-u-1-2 form-col">
                <TextInput type="text" label="Company UEN" placeholder="Company UEN" value={this.state.companyUEN} onChange={this.onValueChange('companyUEN')} error={page.errors.companyUEN} />
              </div>
              {/* <!--/form-row--> */}
            </div>
          </div>
          <div className={classNames('title -section text -light', styles.pageSubTitle)}>Company Registered Address</div>
          {/* <!--/title--> */}
          <div className="form">
            <div className="pure-g form-row">
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Block/House number" placeholder="Block/House number" value={this.state.houseNumber} onChange={this.onValueChange('houseNumber')} error={page.errors.houseNumber} />
              </div>
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Street name" placeholder="Street name" value={this.state.streetName} onChange={this.onValueChange('streetName')} error={page.errors.streetName} />
              </div>
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Storey level" placeholder="Storey level" value={this.state.storeyLevel} mask="digits" onChange={this.onValueChange('storeyLevel')} onBlur={this.checkStoreyLevel} error={page.errors.storeyLevel} />
              </div>
            </div>
            {/* <!--/form-row--> */}
            <div className="pure-g form-row">
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Unit number" placeholder="00000000" value={this.state.unitNumber} mask="digits" onChange={this.onValueChange('unitNumber')} error={page.errors.unitNumber} />
              </div>
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Building Name" placeholder="Building Name" value={this.state.buildingName} onChange={this.onValueChange('buildingName')} error={page.errors.buildingName} />
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
                <TextInput type="text" label="Postal Code" placeholder="00000000" value={this.state.postalCode} mask="digits" onChange={this.onValueChange('postalCode')} error={page.errors.postalCode} />
              </div>
              <div className="pure-u-1-3 form-col"></div>
            </div>
            {/* <!--/form-row--> */}
          </div>
          <div className="hr -spaced"></div>
          <div className="form">
            <div className="pure-g form-row">
              <div className="pure-u-1-3 form-col"></div>
              <div className="pure-u-1-3 form-col"></div>
              <div className="pure-u-1-3 form-col">
                <Button theme={BUTTON_THEMES.GREEN_SLIM}>Continue</Button>
              </div>
            </div>
          </div>
          {/* <!--/buttons--> */}
        </form>
      </div>
    );
  }

  renderBankAccountStep() {
    const page = this.props.page.toJS();
    const [searchable, clearable] = [true, false];
    const foreignMailingAddressPlaceholder = this.state.disabled.foreignMailingAddress ? '' : 'Foreign mailing address';
    return (
      <div>
        <form onSubmit={this.submitBankAccountForm}>
          <div className={classNames('title -section text -light', styles.pageSectionTitle)}>Autorized Officer</div>
          {/* <!--/title--> */}
          <div className="form">
            <div className="pure-g form-row">
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Full Name" placeholder="Full Name" value={this.state.officerFullName} onChange={this.onValueChange('officerFullName')} error={page.errors.officerFullName} />
              </div>
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Mobile number" placeholder="+65 0000-0000" value={this.state.mobileNumber} mask="mobilePhone" onChange={this.onValueChange('mobileNumber')} error={page.errors.mobileNumber} />
              </div>
              <div className="pure-u-1-3 form-col">
                <TextInput type="text" label="Email" placeholder="Email" value={this.state.email} onChange={this.onValueChange('email')} error={page.errors.email} />
              </div>
            </div>
            {/* <!--/form-row--> */}
            <div className="pure-g form-row">
              <div className="pure-u-1-2 form-col">
                <TextInput type="text" label="Foreign mailing address" placeholder={foreignMailingAddressPlaceholder} disabled={this.state.disabled.foreignMailingAddress} value={this.state.foreignMailingAddress} onChange={this.onValueChange('foreignMailingAddress')} error={page.errors.foreignMailingAddress} />
                <div className={styles.pageSectionInputInfo}>
                  <CheckboxGroup name="checkbox-name" value={[this.state.sameWithCompanyInfo]} onChange={this.onSameAddressChange}>
                    <Checkbox value="true" label="Same with Company Registered address" />
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
                <SelectField options={BANKS} value={this.state.bankName} searchable={searchable} clearable={clearable} label="Bank Name" placeholder="Bank Name" onChange={this.onValueChange('bankName')} error={page.errors.bankName} />
              </div>
              <div className="pure-u-1-2 form-col">
                <TextInput type="text" label="Branch Name" placeholder="Branch Name" onChange={this.onValueChange('branchName')} error={page.errors.branchName} />
              </div>
            </div>
            {/* <!--/form-row--> */}
            <div className="pure-g form-row">
              <div className="pure-u-1-2 form-col">
                <TextInput type="text" label="Bank Account Number" placeholder="00000000" value={this.state.bankAccountNumber} mask="digits" onChange={this.onValueChange('bankAccountNumber')} error={page.errors.bankAccountNumber} />
              </div>
              <div className="pure-u-1-2 form-col">
                <TextInput type="text" label="Confirm Bank Account Number" placeholder="00000000" value={this.state.bankAccountNumberConfirmation} mask="digits" onChange={this.onValueChange('bankAccountNumberConfirmation')} error={page.errors.bankAccountNumberConfirmation} />
              </div>
            </div>
            {/* <!--/form-row--> */}
            <div className="pure-g form-row">
              <div className="pure-u-1-2 form-col">
                <TextInput type="text" label="Bank Account Holder Name" placeholder="Bank Account Holder Name" value={this.state.bankAccountHolderName} onChange={this.onValueChange('bankAccountHolderName')} error={page.errors.bankAccountHolderName} />
              </div>
              <div className="pure-u-1-2 form-col"></div>
            </div>
            {/* <!--/form-row--> */}
          </div>
          <div className="hr -spaced"></div>
          <div className="form">
            <div className="pure-g form-row">
              <div className="pure-u-1-3 form-col">
                <Button type="button" name="back" theme={BUTTON_THEMES.GREEN_INVERSE_SLIM} onClick={this.toStep(PAGE_STEPS.GENERAL)}>Back</Button>
              </div>
              <div className="pure-u-1-3 form-col"></div>
              <div className="pure-u-1-3 form-col">
                <Button type="submit" name="register" theme={BUTTON_THEMES.GREEN_SLIM}>Register</Button>
              </div>
            </div>
          </div>
          {/* <!--/buttons--> */}
        </form>
      </div>
    );
  }

  renderForm() {
    const page = this.props.page.toJS();
    return page.show.form ? (
      <div>
        {this.state.step === PAGE_STEPS.GENERAL && this.renderGeneralStep()}
        {this.state.step === PAGE_STEPS.BANK_ACCOUNT && this.renderBankAccountStep()}
      </div>
    ) : null;
  }

  renderMessage() {
    const page = this.props.page.toJS();
    const message = 'Thank you! You have successfully completed the registration.';
    return page.show.message ? (
      <div className={styles.pageMessage}>
        <SuccessNotice message={message} />
        <div className={styles.pageMessageButton}>
          <Button theme={BUTTON_THEMES.GREEN_SLIM} onClick={this.toHomePage}>Start using the system!</Button>
        </div>
      </div>
    ) : null;
  }

  render() {
    const page = this.props.page.toJS();
    if (page.loading) return null;
    return (
      <InnerAppContainer>
        <Helmet title="Registaration Page" />
        <div className={styles.page}>
          <Notice page="registration" />
          {this.renderForm()}
          {this.renderMessage()}
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

export default connect(mapStateToProps, { layoutUpdate, getProfile, validateForm, register, loadPage, push })(RegistrationPage);
