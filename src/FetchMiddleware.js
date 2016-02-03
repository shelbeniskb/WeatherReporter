// import 'whatwg-fetch';

export default store => next => action => {
  // if not satisfy fetch middleware, let it go!
  if (!action.url || !action.types) {
    return next(action);
  }

  const { url, params, types, method = 'GET' } = action;
  const [loadingType, successType, failureType] = types;

  if (loadingType) {
    next({ ...action, type: loadingType });
  }

  const successCb = data => next({
    ...action,
    payload: data,
    type: successType,
  });

  const failureCb = e => {
    if (failureType) {
      return next({
        ...action,
        payload: 'error occurs!',
        type: failureType,
      });
    }
  };

  const generateUrl = () => {
    const validKeys = Object.keys(params).filter(key => params[key] !== null);

    return url + '?' + validKeys.map(key => key + '=' + params[key]).join('&');
  };

  const option = {
    method,
    credentials: 'include',
    mode: 'cors',
  };

  return fetch(generateUrl(), option)
    .then(response => response.json())
    .then(successCb, failureCb);
};
