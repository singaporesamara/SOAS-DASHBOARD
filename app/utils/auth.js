const TOKEN_KEY = 'AUTH_TOKEN';

export function setAuthToken(token) {
  return localStorage.setItem(TOKEN_KEY, token);
}

export function removeAuthToken() {
  return localStorage.removeItem(TOKEN_KEY);
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}
