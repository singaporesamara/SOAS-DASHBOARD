import { each } from 'lodash';
import request, { toQueryString, postJson, putJson, deleteJson } from './request';

function makePath(path, { replacements, params }) {
  let newPath = path;
  if (replacements) {
    if (!(typeof replacements === 'object')) {
      throw new Error(`Replacements need to be object, ${typeof replacements} provided for ${newPath}`);
    }
    each(replacements, (value, name) => {
      if (newPath.includes(`:${name}`)) {
        newPath = newPath.replace(`:${name}`, value);
      } else {
        throw new Error(`Can't find :${name} in ${newPath}`);
      }
    });
    if (newPath.includes(':')) {
      throw new Error(`Not all replacements were provided: ${newPath}`);
    }
  }

  let query = '';
  if (params) {
    query = `?${toQueryString(params)}`;
  }
  return `${newPath}${query}`;
}

function resolvePathArgs(path, args) {
  const shouldHaveReplacements = path.includes(':');
  let replacements;
  let data;
  let options;

  if (shouldHaveReplacements) {
    replacements = args[0];
    data = args[1];
    options = args[2] || {};
    if (!replacements) {
      throw new Error(`Please provide attributes for path: ${path}`);
    }
  } else {
    data = args[0];
    options = args[1] || {};
  }

  return { shouldHaveReplacements, data, options, replacements };
}

function makeGetPath(path, args) {
  const { replacements, data: params, shouldHaveReplacements } = resolvePathArgs(path, args);
  return makePath(path, { replacements: shouldHaveReplacements && replacements, params });
}

export function get(path) {
  const curry = (...args) => {
    const { options } = resolvePathArgs(path, args);
    return request(makeGetPath(path, args), options);
  };
  curry.getPath = (args) => makeGetPath(path, args);
  return curry;
}

export function post(path) {
  return (...args) => {
    const { replacements, data, options, shouldHaveReplacements } = resolvePathArgs(path, args);
    const result = makePath(path, { replacements: shouldHaveReplacements && replacements });
    return postJson(result, data, options);
  };
}

export function put(path) {
  return (...args) => {
    const { replacements, data, options, shouldHaveReplacements } = resolvePathArgs(path, args);
    const result = makePath(path, { replacements: shouldHaveReplacements && replacements });
    return putJson(result, data, options);
  };
}

// delete is a reserved word
export function destroy(path) {
  return (...args) => {
    const { replacements, data, options, shouldHaveReplacements } = resolvePathArgs(path, args);
    const result = makePath(path, { replacements: shouldHaveReplacements && replacements });
    return deleteJson(result, data, options);
  };
}
