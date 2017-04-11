import { RULES } from '../../../utils/validation';

export function getProfileFields() {
  return {
    companyName: '',
    companyUEN: '',
    houseNumber: '',
    streetName: '',
    storeyLevel: '',
    unitNumber: '',
    buildingName: '',
    city: 'Singapore',
    country: 'Singapore',
    postalCode: '',
    officerFullName: '',
    mobileNumber: '',
    email: '',
    foreignMailingAddress: '',
    bankName: '',
    branchName: '',
    bankAccountNumber: '',
    bankAccountNumberConfirmation: '',
    bankAccountHolderName: '',
    sameWithCompanyInfo: false,
  };
}

export function generalFormValidationRules() {
  const fields = ['companyName', 'companyUEN', 'houseNumber', 'streetName', 'storeyLevel', 'unitNumber', 'buildingName', 'postalCode'];
  const rules = {
    companyName: RULES.required,
    companyUEN: RULES.required,
    houseNumber: RULES.required,
    streetName: RULES.required,
    storeyLevel: RULES.required,
    unitNumber: RULES.required,
    buildingName: RULES.required,
    postalCode: RULES.required,
  };
  return { rules, fields };
}

export function bankAccountFormValidationRules() {
  const fields = ['officerFullName', 'mobileNumber', 'email', 'foreignMailingAddress', 'bankName', 'branchName', 'bankAccountNumber', 'bankAccountNumberConfirmation', 'bankAccountHolderName'];
  const rules = {
    officerFullName: RULES.required,
    mobileNumber: RULES.phone,
    email: RULES.email,
    foreignMailingAddress: RULES.required,
    bankName: RULES.required,
    branchName: RULES.required,
    bankAccountNumber: RULES.required,
    bankAccountNumberConfirmation: RULES.equalsTo('bankAccountNumber'),
    bankAccountHolderName: RULES.required,
  };
  return { rules, fields };
}
