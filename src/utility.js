import axios from 'axios';
import {APP_ID, APP_KEY} from './config';
import { loadAuthToken } from './local-storage';


export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties
});

export const postData = (url, data, onSuccess, onFail, dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (url.includes("exercise") || url.includes("nutrients")) {
    config.headers['x-app-id'] = `${APP_ID}`;
    config.headers['x-app-key'] = `${APP_KEY}`;
  }

  if (url.includes("nutrition") || url.includes("exercise")) {
    const authToken = loadAuthToken();

    if (authToken !== null) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
  }

  axios.post(url, data, config)
    .then(res => {
      try {
        onSuccess(res.data);
      } catch(err) {
        console.error(err.response);
        onFail(err.response);
      }
    })
    .catch(err => {
      onFail(err.response);
    });
}

export const getData = (url, onSuccess, onFail) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const authToken = loadAuthToken();
  if (authToken !== null) {
    config.headers['Authorization'] = `Bearer ${authToken}`
  }

  axios.get(url, config)
    .then(res => {
      // try {
        onSuccess(res.data);
      // } catch(e) {
      //   console.log(e);
      // }
    })
    .catch(e => {
      console.log(e);
      onFail(e);
    });
}

export const removeData = (url, onSuccess, onFail) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const authToken = loadAuthToken();
  if (authToken !== null) {
    config.headers['Authorization'] = `Bearer ${authToken}`
  }

  axios.delete(url, config)
    .then(res => {
      try {
        onSuccess(res.data);
      } catch(e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
      onFail(e);
    });
}

