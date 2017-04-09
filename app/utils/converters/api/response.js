export function convertProfileResponse(params) {
  return {
    email: params.Email,
    registered: params.Registered,
  };
}
