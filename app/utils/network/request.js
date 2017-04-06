import 'whatwg-fetch';
// import { newNotice } from '../components/NoticeStack/actions';

const BASE_URL = 'http://localhost:3000/';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON or text from the request
 */
function parseResponse(response) {
  return response[response.status === 204 ? 'text' : 'json']();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response && response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response ? response.statusText : 'Offline');
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  const requestOptions = Object.assign({}, {
    credentials: 'include',
    headers: {
      'Auth-Token': window.__authToken || '' // eslint-disable-line
    },
  }, options);
  return fetch(url, requestOptions)
      .then(checkStatus)
      .then(parseResponse)
      .then((data) => {
        let dataObject = data;
        if (dataObject === '') {
          dataObject = {};
        }
        return { data: dataObject };
      })
      .catch((err) => {
        if (!err.response) {
          console.log('offline'); // eslint-disable-line
          return { err, data: {}, offline: true, status: 500 };
        }
        return err.response.json().then((data) => { // eslint-disable-line
          return { err, data };
        }).catch(() => { // eslint-disable-line
          return { err, data: {} };
        });
      });
}

function jsonWithBody(url, body, options, method) {
  const requestOptions = Object.assign({},
    {
      credentials: 'include',
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Auth-Token': window.__authToken || '', // eslint-disable-line
      },
    },
    options);
  return request(url, Object.assign({
    body: JSON.stringify(Object.assign({ authenticity_token: window.__formAuthenticityToken }, body)), // eslint-disable-line
  }, requestOptions));
}

export function postJson(url, body = {}, options = {}) {
  return jsonWithBody(url, body, options, 'POST');
}

export function putJson(url, body = {}, options = {}) {
  return jsonWithBody(url, body, options, 'PUT');
}

export function deleteJson(url, body = {}, options = {}) {
  return jsonWithBody(url, body, options, 'DELETE');
}

// export function displayErrors(requestResult) {
//   if (requestResult.offline) {
//     return newNotice({ type: 'error', title: 'Offline', content: 'Unavailable while you are offline!', unique: true });
//   }
//   const { errors } = requestResult.data;
//   return newNotice({ type: 'error', title: 'Error', content: (errors ? errors.join('. ') : 'Some error occurred!') });
// }

export function toQueryString(params) {
  return Object.keys(params).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
}

export function withBasePath(url = BASE_URL) {
  return (path) => { // eslint-disable-line arrow-body-style
    return `${url}${path}`;
  };
}
