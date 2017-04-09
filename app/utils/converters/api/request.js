export function convertRegistrationRequest(params) {
  return {
    CoName: params.companyName,
    CoUEN: params.companyUEN,
    BlkHseNo: params.buildingName,
    StreetName: params.storeyLevel,
    Storey: params.streetName,
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
