export function convertProfileResponse(params) {
  return {
    email: params.profile.Email,
    registered: params.profile.Registered,
    company: {
      name: params.profile.CoName,
    },
    balance: params.balance,
  };
}
