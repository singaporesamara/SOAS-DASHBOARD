export function convertProfileResponse(params) {
  const { profile } = params;
  return {
    email: profile.Email,
    registered: profile.Registered,
    company: {
      name: profile.CoName,
    },
    balance: profile.balance,
  };
}
