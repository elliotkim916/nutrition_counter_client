import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {SubmissionError} from 'redux-form';

export const registerUser = user => dispatch => {
  return fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .catch(err => {
    const {location, reason, message} = err;
    // if user tries to register with a username that is already taken
    if (reason === 'ValidationError') {
      return Promise.reject(
        SubmissionError({
          [location]: message
        })
      );
    }
  });
};