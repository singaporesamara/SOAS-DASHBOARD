export function convertProfileResponse(params) {
  return {
    email: params.profile.Email,
    registered: params.profile.Registered,
    balance: params.balance,
  };
}
