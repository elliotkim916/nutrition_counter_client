// Handles any errors received from the API

export const normalizeResponseErrors = res => {
  if (!res.ok) {
    if (
      res.headers.has('content-type') &&
      res.headers.get('content-type').startsWith('application/json')
    ) {
      // Its a nice JSON error returned by us, so decode it
      return res.json().then(err => Promise.reject(err));
    }
    // Its a less informative error returned by Express
    return Promise.reject({
      code: res.status,
      message: res.statusText
    });
  }
  return res;
}