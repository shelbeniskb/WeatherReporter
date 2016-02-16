import { addUrlParams } from './utils';

const fetchSimple = (url, params, method) => {
  const fetchPromise = fetch(addUrlParams(url, params), {
    method,
    credentials: 'include',
  }).then(response => response.json());

  const setPromiseTimeout = (promise, ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('request timeout'));
      }, ms);
      promise.then(resolve, reject);
    });
  };

  return setPromiseTimeout(fetchPromise, 1000);
};


export default store => next => action => {
  // if not satisfy fetch middleware, let it go!
  if (!action.url || !action.types) {
    return next(action);
  }

  const { url, params, types, method = 'GET' } = action;
  const [loadingType, successType, failureType] = types;
  // dispatch a new action with loading type
  if (loadingType) {
    next({ ...action, type: loadingType });
  }
  // dispatch a new action with success type
  const successCb = data => {
    next({ ...action, payload: data, type: successType });
  };
  // dispatch a new action with failure type
  const failureCb = e => {
    if (failureType) {
      next({ ...action, payload: e, type: failureType });
    }
  };

  // return fetch(addUrlParams(url, params), { method, credentials: 'include' })
  //   .then(response => response.json())
  //   .then(successCb, failureCb);
  return fetchSimple(url, params, method).then(successCb, failureCb);
};
