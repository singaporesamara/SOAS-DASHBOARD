export function convertRegistrationRequest(params) {
  return {
    CoName: params.companyName,
    CoUEN: params.companyUEN,
    BlkHseNo: params.houseNumber,
    StreetName: params.streetName,
    Storey: params.storeyLevel,
    UnitNo: params.unitNumber,
    BuildingName: params.buildingName,
    PostalCode: params.postalCode,
    AuthorisedOfficer: params.officerFullName,
    ClientMobile: params.mobileNumber,
    ForeignAddress1: params.email,
    ForeignAddress2: params.foreignMailingAddress,
    BankName: params.bankName.value,
    BranchName: params.branchName,
    AccountNumber: params.bankAccountNumber,
    AccountHolderName: params.bankAccountHolderName,
  };
}

export function convertTopUpRequest(params) {
  return {
    card_number: params.number,
    card_expire: params.expirationDate,
    card_cvc: params.cvc,
    amount: params.amount,
  };
}

export function convertCreateTransactionRequest(params) {
  return {
    tokenTo: params.emailOrUEN,
    amount: params.amount,
    purpose: params.purpose,
    description: params.description,
  };
}

export function convertTopUpByGIRORequest(params) {
  return {
    bank_account: params.bankAccountNumber,
    bank_name: params.bankName,
    branch_code: params.branchCode,
    amount: params.amount,
  };
}

export function convertCreateGIROTransactionRequest(params) {
  return {
    uen: params.companyUEN,
    bank_account: params.bankAccountNumber,
    bank_name: params.bankName,
    branch_code: params.branchCode,
    purpose: params.purpose,
    description: params.description,
    file: '',
    amount: params.amount,
  };
}
