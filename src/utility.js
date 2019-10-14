// import axios from 'axios';
// import {APP_ID, APP_KEY} from '../config';

export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties
});

// export const postData = (url, data, onSuccess, onFail, dispatch) => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   };

//   if (url.includes("exercise") || url.includes("nutrients")) {
//     config.headers['x-app-id'] = `${APP_ID}`;
//     config.headers['x-app-key'] = `${APP_KEY}`;
//   }

//   axios.post(url, data, config)
//     .then(res => {
//       try {
//         onSuccess(res);
//       } catch(e) {
//         console.error(e);
//       }
//     })
//     .catch(err => {
//       onFail(err);
//     });
// }

